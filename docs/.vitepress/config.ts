import { defineConfig } from 'vitepress';
import typedocSidebar from '../api/typedoc-sidebar.json' with { type: 'json' };
import typedocSidebarRu from '../api/typedoc-sidebar.ru.json' with { type: 'json' };

const SITE_URL = 'https://mrrefactoring.github.io/confluence.js';
const SITE_TITLE = 'confluence.js';
const SITE_TAGLINE = 'Type-safe Confluence Cloud REST API client';
const SITE_DESCRIPTION_EN =
  'Type-safe Confluence Cloud REST API client for TypeScript and JavaScript. Both API versions — v1 and v2 — from one package. ESM-only, tree-shakable, validated by Zod 4.';
const SITE_DESCRIPTION_RU =
  'Типобезопасный клиент Confluence Cloud REST API для TypeScript и JavaScript. Обе версии API — v1 и v2 — в одном пакете. Только ESM, tree-shaking, валидация через Zod 4.';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const guideSidebar = (ru = false) => {
  const p = ru ? '/ru' : '';

  return [
    {
      text: ru ? 'Руководство' : 'Guide',
      items: [
        { text: ru ? 'Быстрый старт' : 'Getting Started', link: `${p}/guide/getting-started` },
        { text: ru ? 'Установка' : 'Installation', link: `${p}/guide/installation` },
        { text: ru ? 'Аутентификация' : 'Authentication', link: `${p}/guide/authentication` },
        { text: ru ? 'Выбор версии API' : 'Choosing a version', link: `${p}/guide/choosing-a-version` },
        { text: ru ? 'Обработка ошибок' : 'Error Handling', link: `${p}/guide/error-handling` },
        { text: ru ? 'Повторы запросов' : 'Retries', link: `${p}/guide/retries` },
        { text: 'Tree-Shaking', link: `${p}/guide/tree-shaking` },
        { text: 'TypeScript', link: `${p}/guide/typescript` },
      ],
    },
    {
      text: ru ? 'Рецепты' : 'Recipes',
      items: [
        { text: ru ? 'Страницы' : 'Pages', link: `${p}/recipes/pages` },
        { text: ru ? 'Пространства' : 'Spaces', link: `${p}/recipes/spaces` },
        { text: ru ? 'Вложения' : 'Attachments', link: `${p}/recipes/attachments` },
        { text: ru ? 'Поиск (CQL)' : 'Search (CQL)', link: `${p}/recipes/search` },
        { text: ru ? 'Комментарии' : 'Comments', link: `${p}/recipes/comments` },
        { text: ru ? 'Метки' : 'Labels', link: `${p}/recipes/labels` },
        { text: ru ? 'Ограничения доступа' : 'Restrictions', link: `${p}/recipes/restrictions` },
      ],
    },
    {
      text: ru ? 'Миграция' : 'Migration',
      items: [{ text: '2.x → 3.0', link: `${p}/migration/v2-to-v3` }],
    },
  ];
};

const apiSidebar = [{ text: 'API Reference', items: typedocSidebar }];
const apiSidebarRu = [{ text: 'API Reference', items: typedocSidebarRu }];

export default defineConfig({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION_EN,
  base: '/confluence.js/',
  cleanUrls: true,
  lastUpdated: false,

  // Deliberately not ignoring anything under /api/: `docs:build` always generates
  // the reference first, so a dead link there is a real one worth failing on.
  ignoreDeadLinks: ['localhostLinks'],

  sitemap: { hostname: `${SITE_URL}/` },

  head: [
    // Locale auto-detection, inline so it runs before the first paint:
    //   - already under /ru/ → record the choice, do not redirect;
    //   - a Russian browser with no recorded choice → send to the RU twin of this
    //     exact path, preserving query and hash;
    //   - anything else → record 'en'.
    // Once a choice is stored, this returns immediately: picking a language from
    // the switcher is permanent, and a redirect must never override it.
    [
      'script',
      {},
      `(function(){try{var K='confluence.js:locale',B='/confluence.js/',p=location.pathname,isRu=p.indexOf(B+'ru/')===0||p===B+'ru'||p===B+'ru/';var s=localStorage.getItem(K);if(s)return;if(isRu){localStorage.setItem(K,'ru');return;}var L=(navigator.language||'').toLowerCase();if(L.indexOf('ru')===0&&p.indexOf(B)===0){localStorage.setItem(K,'ru');location.replace(p.replace(B,B+'ru/')+location.search+location.hash);}else{localStorage.setItem(K,'en');}}catch(e){}})();`,
    ],

    ['link', { rel: 'icon', href: '/confluence.js/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#0052cc' }],
    ['meta', { name: 'author', content: 'Vladislav Tupikin' }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: SITE_TITLE }],
    ['meta', { property: 'og:title', content: `${SITE_TITLE} — ${SITE_TAGLINE}` }],
    ['meta', { property: 'og:description', content: SITE_DESCRIPTION_EN }],
    ['meta', { property: 'og:url', content: `${SITE_URL}/` }],
    ['meta', { property: 'og:image', content: OG_IMAGE }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:image:alt', content: `${SITE_TITLE} — ${SITE_TAGLINE}` }],

    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: `${SITE_TITLE} — ${SITE_TAGLINE}` }],
    ['meta', { name: 'twitter:description', content: SITE_DESCRIPTION_EN }],
    ['meta', { name: 'twitter:image', content: OG_IMAGE }],

    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: SITE_TITLE,
        description: SITE_DESCRIPTION_EN,
        codeRepository: 'https://github.com/MrRefactoring/confluence.js',
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'Node.js',
        license: 'https://opensource.org/licenses/MIT',
        author: { '@type': 'Person', name: 'Vladislav Tupikin' },
        keywords: 'confluence, confluence-api, atlassian, typescript, esm, zod, tree-shaking, type-safe, wiki',
        url: `${SITE_URL}/`,
      }),
    ],
  ],

  transformHead: ({ pageData }) => {
    const head: [string, Record<string, string>][] = [];

    const relativePath = pageData.relativePath
      .replace(/\.md$/, '')
      .replace(/(^|\/)index$/, '$1')
      .replace(/\/$/, '');

    const isRu = relativePath === 'ru' || relativePath.startsWith('ru/');
    const enRelative = isRu ? relativePath.replace(/^ru\/?/, '') : relativePath;
    const ruRelative = isRu ? relativePath : relativePath ? `ru/${relativePath}` : 'ru';

    const url = (path: string) => `${SITE_URL}/${path ? `${path}/` : ''}`.replace(/\/+$/, '/');

    head.push(['link', { rel: 'canonical', href: url(relativePath) }]);
    head.push(['link', { rel: 'alternate', hreflang: 'en', href: url(enRelative) }]);
    head.push(['link', { rel: 'alternate', hreflang: 'ru', href: url(ruRelative) }]);
    head.push(['link', { rel: 'alternate', hreflang: 'x-default', href: url(enRelative) }]);

    return head;
  },

  themeConfig: {
    logo: '/logo.svg',
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MrRefactoring/confluence.js' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/confluence.js' },
    ],
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description: SITE_DESCRIPTION_EN,
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/getting-started' },
          { text: 'Recipes', link: '/recipes/pages' },
          { text: 'API', link: '/api/' },
          { text: 'Migration', link: '/migration/v2-to-v3' },
        ],
        sidebar: {
          '/guide/': guideSidebar(),
          '/recipes/': guideSidebar(),
          '/migration/': guideSidebar(),
          '/api/': apiSidebar,
        },
        editLink: {
          pattern: 'https://github.com/MrRefactoring/confluence.js/edit/master/docs/:path',
          text: 'Edit this page on GitHub',
        },
        outline: { label: 'On this page', level: [2, 3] },
        docFooter: { prev: 'Previous', next: 'Next' },
      },
    },
    ru: {
      label: 'Русский',
      lang: 'ru-RU',
      link: '/ru/',
      description: SITE_DESCRIPTION_RU,
      themeConfig: {
        nav: [
          { text: 'Руководство', link: '/ru/guide/getting-started' },
          { text: 'Рецепты', link: '/ru/recipes/pages' },
          { text: 'API', link: '/ru/api/' },
          { text: 'Миграция', link: '/ru/migration/v2-to-v3' },
        ],
        sidebar: {
          '/ru/guide/': guideSidebar(true),
          '/ru/recipes/': guideSidebar(true),
          '/ru/migration/': guideSidebar(true),
          '/ru/api/': apiSidebarRu,
        },
        editLink: {
          pattern: 'https://github.com/MrRefactoring/confluence.js/edit/master/docs/:path',
          text: 'Редактировать на GitHub',
        },
        outline: { label: 'На этой странице', level: [2, 3] },
        docFooter: { prev: 'Назад', next: 'Далее' },
      },
    },
  },
});
