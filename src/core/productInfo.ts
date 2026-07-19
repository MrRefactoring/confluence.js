/**
 * The handful of places where the shared core has to name its own product.
 *
 * This file is generated. Everything else under `core/` is identical across the libraries, and stays that way by
 * reading these values rather than hard-coding a product name.
 */
interface ProductInfo {
  packageName: string;
  gatewaySlug: string;
  scopeHint: string;
}

/** Typed as plain strings on purpose: a product may leave the optional fields empty, and the code must still check. */
export const PRODUCT: ProductInfo = {
  /** The npm package name, e.g. `confluence.js`. */
  packageName: 'confluence.js',

  /**
   * The Atlassian gateway slug, as in `https://api.atlassian.com/ex/<slug>/{cloudId}`.
   *
   * Empty for products that are not behind the Atlassian gateway, where OAuth 2.0 (3LO) does not apply.
   */
  gatewaySlug: 'confluence',

  /** Product-specific advice appended to a scope-mismatch 401, where the scope families differ per product. */
  scopeHint: 'Note that v2 endpoints need granular scopes (read:page:confluence) while v1 endpoints need classic ones (read:confluence-content.all).',
};

/**
 * The package name reduced to something safe inside a multipart boundary and a symbol key.
 *
 * A boundary may not contain a dot without being quoted, and `confluence.js` has one.
 */
export const PRODUCT_SLUG = PRODUCT.packageName.replace(/[^a-zA-Z0-9]+/g, '-');
