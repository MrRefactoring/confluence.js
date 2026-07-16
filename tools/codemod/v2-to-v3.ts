/**
 * confluence.js 2.x → 3.0 codemod.
 *
 * Rewrites what can be rewritten safely:
 *   - `new ConfluenceClient({…})`      → `createV1Client({…})`
 *   - `authentication: { basic: … }`   → `auth: { type: 'basic', … }`
 *   - `authentication: { oauth2: … }`  → `auth: { type: 'bearer', token }`
 *   - `noCheckAtlassianToken: true`    → `headers: { 'X-Atlassian-Token': 'no-check' }`
 *   - deep imports (`confluence.js/api/content`) → `confluence.js/v1`
 *   - trailing callback arguments      → dropped (the API is promise-only)
 *
 * Everything it cannot decide gets a `TODO(confluence.js@3)` comment rather than
 * a guess: JWT auth, middlewares, baseRequestConfig, apiPrefix, and the v1
 * operations Atlassian removed from the spec. See MIGRATION.md.
 *
 * Usage:
 *   npx jscodeshift -t tools/codemod/v2-to-v3.ts --parser ts --extensions ts,tsx,js,jsx src/
 */
import type { API, ASTPath, Collection, FileInfo, JSCodeshift, ObjectExpression, Options } from 'jscodeshift';

const TODO = 'TODO(confluence.js@3)';

/** v1 operations Atlassian dropped from the spec; each needs a human decision. */
const REMOVED_V1_METHODS = new Map<string, string>([
  ['getContent', 'v2: page.getPages / blogPost.getBlogPosts / customContent.getCustomContent'],
  ['getContentById', 'v2: page.getPageById / blogPost.getBlogPostById'],
  ['getContentByTypeForSpace', 'v2: page.getPagesInSpace / blogPost.getBlogPostsInSpace'],
  ['getContentForSpace', 'v2: page.getPagesInSpace / blogPost.getBlogPostsInSpace'],
  ['createContent', 'v2: page.createPage / blogPost.createBlogPost'],
  ['updateContent', 'v2: page.updatePage / blogPost.updateBlogPost'],
  ['deleteContent', 'v2: page.deletePage / blogPost.deleteBlogPost'],
  ['getContentChildren', 'v2: children.getPageChildren'],
  ['getContentChildrenByType', 'v2: children.getPageChildren'],
  ['getContentComments', 'v2: comment.getPageFooterComments / comment.getPageInlineComments'],
  ['getAttachments', 'v2: attachment.getPageAttachments'],
  ['createAttachments', 'no v2 equivalent — raw multipart POST, see MIGRATION.md'],
  ['downloadAttachment', 'v2: attachment.getAttachmentById, then fetch downloadLink'],
  ['getContentVersions', 'v2: version.getPageVersions'],
  ['getContentVersion', 'v2: version.getPageVersions'],
  ['getHistoryForContent', 'v2: version.getPageVersions'],
  ['getLabelsForContent', 'v2: label.getPageLabels / label.getBlogPostLabels'],
  ['getContentProperties', 'v2: contentProperties.getPageContentProperties'],
  ['getContentProperty', 'v2: contentProperties.getPageContentPropertiesById'],
  ['createContentProperty', 'v2: contentProperties.createPageProperty'],
  ['createContentPropertyForKey', 'v2: contentProperties.createPageProperty'],
  ['updateContentProperty', 'v2: contentProperties.updatePagePropertyById'],
  ['deleteContentProperty', 'v2: contentProperties.deletePagePropertyById'],
  ['getSpace', 'v2: space.getSpaceById'],
  ['getSpaces', 'v2: space.getSpaces'],
  ['getSpaceProperties', 'v2: spaceProperties.getSpaceProperties'],
  ['getSpaceProperty', 'v2: spaceProperties.getSpacePropertyById'],
  ['createSpaceProperty', 'v2: spaceProperties.createSpaceProperty'],
  ['createSpacePropertyForKey', 'v2: spaceProperties.createSpaceProperty'],
  ['updateSpaceProperty', 'v2: spaceProperties.updateSpacePropertyById'],
  ['deleteSpaceProperty', 'v2: spaceProperties.deleteSpacePropertyById'],
  ['searchTasks', 'v2: task.getTasks'],
  ['getTaskById', 'v2: task.getTaskById'],
  ['updateTaskById', 'v2: task.updateTask'],
  ['convertContentBody', 'no v2 equivalent — stay on confluence.js@2 for this call'],
  ['addUserToGroup', 'no v2 equivalent — moved to the Atlassian Admin API'],
  ['removeMemberFromGroup', 'no v2 equivalent — moved to the Atlassian Admin API'],
]);

/** Config keys that cannot be translated and must be looked at by a human. */
const UNTRANSLATABLE_CONFIG = new Map<string, string>([
  ['middlewares', 'removed — wrap calls in try/catch instead'],
  ['baseRequestConfig', 'removed — it was an axios config; use `headers` for headers'],
  ['apiPrefix', 'removed — the API path is part of the request; put a proxy prefix in `host`'],
]);

function comment(j: JSCodeshift, node: { comments?: unknown[] | null }, text: string): void {
  const line = j.commentLine(` ${TODO}: ${text}`, true, false);

  node.comments = [...((node.comments as never[]) ?? []), line as never];
}

function property(j: JSCodeshift, object: ObjectExpression, name: string) {
  return object.properties.find(
    prop =>
      (prop.type === 'ObjectProperty' || prop.type === 'Property') &&
      ((prop.key.type === 'Identifier' && prop.key.name === name) ||
        (prop.key.type === 'StringLiteral' && prop.key.value === name)),
  ) as { value: unknown; key: unknown } | undefined;
}

/** `authentication: {...}` → `auth: {...}`, keyed by the scheme it carried. */
function rewriteAuthentication(j: JSCodeshift, config: ObjectExpression): void {
  const authentication = property(j, config, 'authentication');

  if (!authentication || (authentication.value as { type?: string }).type !== 'ObjectExpression') return;

  const inner = authentication.value as ObjectExpression;
  const basic = property(j, inner, 'basic');
  const oauth2 = property(j, inner, 'oauth2');
  const jwt = property(j, inner, 'jwt');

  if (jwt) {
    comment(j, authentication as never, 'JWT auth is not supported in 3.x — stay on confluence.js@2 for Connect apps (MIGRATION.md#jwt-authentication-is-gone)');

    return;
  }

  if (basic && (basic.value as { type?: string }).type === 'ObjectExpression') {
    const fields = (basic.value as ObjectExpression).properties;

    authentication.key = j.identifier('auth');
    authentication.value = j.objectExpression([
      j.objectProperty(j.identifier('type'), j.stringLiteral('basic')),
      ...(fields as never[]),
    ]);

    return;
  }

  if (oauth2 && (oauth2.value as { type?: string }).type === 'ObjectExpression') {
    const accessToken = property(j, oauth2.value as ObjectExpression, 'accessToken');

    authentication.key = j.identifier('auth');
    authentication.value = j.objectExpression([
      j.objectProperty(j.identifier('type'), j.stringLiteral('bearer')),
      j.objectProperty(j.identifier('token'), (accessToken?.value ?? j.identifier('accessToken')) as never),
    ]);

    return;
  }

  comment(j, authentication as never, 'could not translate `authentication` — see MIGRATION.md#configuration');
}

function rewriteConfig(j: JSCodeshift, config: ObjectExpression): void {
  rewriteAuthentication(j, config);

  const noCheck = property(j, config, 'noCheckAtlassianToken');

  if (noCheck) {
    noCheck.key = j.identifier('headers');
    noCheck.value = j.objectExpression([
      j.objectProperty(j.stringLiteral('X-Atlassian-Token'), j.stringLiteral('no-check')),
    ]);
  }

  for (const [key, why] of UNTRANSLATABLE_CONFIG) {
    const found = property(j, config, key);

    if (found) comment(j, found as never, `\`${key}\` ${why}`);
  }
}

export default function transform(file: FileInfo, api: API, _options: Options): string | undefined {
  const j = api.jscodeshift;
  const root: Collection = j(file.source);
  let touched = false;

  // import { ConfluenceClient } from 'confluence.js' → createV1Client
  root
    .find(j.ImportDeclaration, { source: { value: 'confluence.js' } })
    .forEach(path => {
      for (const specifier of path.node.specifiers ?? []) {
        if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'ConfluenceClient') {
          specifier.imported = j.identifier('createV1Client');

          if (specifier.local?.name === 'ConfluenceClient') specifier.local = j.identifier('createV1Client');

          touched = true;
        }

        if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'BaseClient') {
          comment(j, path.node, 'BaseClient is gone — compose flat functions from confluence.js/v1 instead (MIGRATION.md#imports-and-entry-points)');
        }
      }
    });

  // Deep imports: confluence.js/api/<ns> → confluence.js/v1
  root
    .find(j.ImportDeclaration)
    .filter(path => typeof path.node.source.value === 'string' && path.node.source.value.startsWith('confluence.js/api/'))
    .forEach(path => {
      path.node.source = j.stringLiteral('confluence.js/v1');
      comment(j, path.node, 'namespace classes are gone — this now imports flat functions; adjust the call sites');
      touched = true;
    });

  // new ConfluenceClient({...}) → createV1Client({...})
  root
    .find(j.NewExpression, { callee: { type: 'Identifier', name: 'ConfluenceClient' } })
    .forEach(path => {
      const config = path.node.arguments[0] as ObjectExpression | undefined;

      if (config?.type === 'ObjectExpression') rewriteConfig(j, config);

      path.replace(j.callExpression(j.identifier('createV1Client'), path.node.arguments as never[]));
      touched = true;
    });

  // client.<ns>.<method>(params, callback) → drop the callback; flag removed methods.
  root.find(j.CallExpression).forEach(path => {
    const callee = path.node.callee;

    if (callee.type !== 'MemberExpression' || callee.property.type !== 'Identifier') return;

    const method = callee.property.name;
    const replacement = REMOVED_V1_METHODS.get(method);

    if (replacement) {
      // Anchor the note to the whole statement. Hanging it on the call itself
      // prints it mid-expression (`const page = // TODO …`), which reads as noise.
      let statement: ASTPath = path;

      while (statement.parent && !/Statement|Declaration/.test(statement.node.type)) statement = statement.parent;

      comment(j, statement.node as never, `\`${method}\` no longer exists — Atlassian removed it from the v1 spec. Use ${replacement}`);
      touched = true;
    }

    const last = path.node.arguments[path.node.arguments.length - 1];

    if (
      path.node.arguments.length >= 2 &&
      last &&
      (last.type === 'ArrowFunctionExpression' || last.type === 'FunctionExpression') &&
      (last as { params?: unknown[] }).params?.length &&
      (last as { params: { name?: string }[] }).params[0]?.name?.match(/^(error|err|e)$/)
    ) {
      path.node.arguments.pop();
      comment(j, path.node, 'the callback was dropped — the API is promise-only now; await this call and catch errors');
      touched = true;
    }
  });

  return touched ? root.toSource({ quote: 'single' }) : undefined;
}
