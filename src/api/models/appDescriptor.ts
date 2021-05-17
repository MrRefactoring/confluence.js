import { Lifecycle } from './lifecycle';

export interface AppDescriptor {
  /** Defines the authentication type to use when signing requests between the host application and the connect app. */
  authentication: {
    /** The type of authentication to use. */
    type: 'jwt' | 'JWT' | 'none' | 'NONE';
  };

  /**
   * The base url of the remote app, which is used for all communications back to the app instance.
   *
   * The baseUrl must start with `https://` to ensure that all data is sent securely between our cloud instances and your app.
   *
   * Note: each app must have a unique baseUrl. If you would like to serve multiple apps from the same host, consider
   * adding a path prefix into the baseUrl.
   */
  baseUrl: string;

  /** A unique key to identify the app. This key must be <= 64 characters. */
  key: string;

  /**
   * The API version is an OPTIONAL integer. If omitted we will infer an API version of 1.
   *
   * The intention behind the API version is to allow vendors the ability to beta test a major revision to their Connect
   * app as a private version, and have a seamless transition for those beta customers (and existing customers) once the
   * major revision is launched.
   *
   * Vendors can accomplish this by listing a new private version of their app, with a new descriptor hosted at a new URL.
   *
   * They use the Atlassian Marketplace's access token facilities to share this version with customers (or for internal
   * use). When this version is ready to be taken live, it can be transitioned from private to public, and all customers
   * will be seamlessly updated.
   *
   * It's important to note that this approach allows vendors to create new versions manually, despite the fact that in
   * the common case, the versions are automatically created. This has a few benefits-- for example, it gives vendors
   * the ability to change their descriptor URL if they need to (the descriptor URL will be immutable for existing versions).
   */
  apiVersion?: number;

  /**
   * A human readable description of what the app does. The description will be visible in the **Manage Apps** section
   * of the administration console. Provide meaningful and identifying information for the instance administrator.
   */
  description?: string;

  /**
   * Whether or not to enable licensing options in the UPM/Marketplace for this app.
   *
   * @default false
   */
  enableLicensing?: boolean;

  /** Allows the app to register for app lifecycle notifications. */
  lifecycle?: Lifecycle;

  /** A set of links that the app wishes to publish. */
  links?: Record<string, any>;

  /** The list of modules this app provides. */
  modules?: Record<string, any>;

  /**
   * The human-readable name of the app. The app's name is visible to customers and must therefore be consistent with
   * the name used to distribute the app such as any listing in the [Atlassian
   * Marketplace](https://marketplace.atlassian.com/). Immutable records are created during the first installation of an
   * app, one of which includes the name of the app. It is therefore important that the name of the app is correct as it
   * can not be changed.
   */
  name?: string;

  /** Set of [scopes](https://developer.atlassian.com/cloud/jira/platform/scopes/) requested by this app. */
  scopes?: string[];

  /** The vendor who is offering the app. */
  vendor?: {
    /** The name of the app vendor. Supply your name or the name of the company you work for. */
    name: string;
    /** The URL for the vendor's website. */
    url: string;
  };
}
