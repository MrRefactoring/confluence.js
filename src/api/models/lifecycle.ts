/**
 * Allows an app to register callbacks for events that occur in the lifecycle of an installation.
 * When a lifecycle event is fired, a POST request will be made to the appropriate URL registered for the event.
 *
 * The installed lifecycle callback is an integral part of the installation process of an app,
 * whereas the remaining lifecycle events are essentially webhooks.
 *
 * Each property in this object is a URL relative to the app's base URL.
 */
export interface Lifecycle {
  /**
   * App key that was installed into the Atlassian Product, as it appears in your app's descriptor.
   */
  key?: string;

  /**
   * Identifying key for the Atlassian product tenant that the app was installed into.
   * This will never change for an Atlassian product tenant. However, be aware that importing data into a site
   * will result in a new tenant. In this case, any app installations into the new tenant (using the same baseUrl as
   * the previous tenant) will result in an installation payload containing a different clientKey.
   * Determining the contract between the instance and app in this situation is tracked by
   * [AC-1528](https://ecosystem.atlassian.net/browse/AC-1528) in the Connect backlog.
   */
  clientKey?: string;

  /**
   * @deprecated This is the public key for this Atlassian product instance. This field is deprecated and should not be used.
   */
  publicKey?: string;

  /**
   * The account ID for identifying users in the `sub` claim sent in JWT during calls.
   * This is the user associated with the relevant action, and may not be present if there is no logged in user.
   */
  accountId?: string;

  /**
   * Use this string to sign outgoing JWT tokens and validate incoming JWT tokens. Optional: and may not be present on
   * non-JWT app installations, and is only sent on the `installed` event.
   * All instances of your app use the same shared secret.
   */
  sharedSecret?: string;

  /**
   * @deprecated This is a string representation of the host product's version. Generally you should not need it.
   */
  serverVersion?: string;

  /**
   * @deprecated This is a [SemVer-compliant](https://semver.org/) version of Atlassian Connect which is running on the host server, for example: `1.1.15`.
   */
  pluginsVersion?: string;

  /**
   * URL prefix for this Atlassian product instance. All of its REST endpoints begin with this `baseUrl`.
   */
  baseUrl: string;

  /**
   * If the Atlassian product instance has an associated custom domain, this is the URL
   * through which users will access the product. Any links which an app renders server-side should use this as
   * the prefix of the link. This ensures links are rendered in the same context as the remainder of the user's site.
   *
   * This field may not be present, in which case the baseUrl value should be used. API requests from your App should
   * always use the baseUrl value and not be based on the URL specified here.
   */
  displayUrl?: string;

  /**
   * Identifies the category of Atlassian product, e.g. `jira` or `confluence`.
   */
  productType?: string;

  /**
   * The host product description - this is customisable by an instance administrator.
   */
  description?: string;

  /**
   * Also known as the SEN, the service entitlement number is the app license ID. This attribute will only be included during installation of a paid app.
   */
  serviceEntitlementNumber?: string;

  /**
   * The OAuth 2.0 client ID for your app. For more information, see [OAuth 2.0 - JWT Bearer token authorization grant type](https://developer.atlassian.com/cloud/jira/platform/oauth-2-jwt-bearer-token-authorization-grant-type/)
   */
  oauthClientId?: string;
}
