/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/batch",
    "/plans",
    "/settings"
  ];
  
  export const protectedRoutes = [
    '/dashboard',
    '/subscription/add'
  ]
  
  /**
   * An array of routes that are used for authentication
   * These routes will redirect logged in users to /settings
   * @type {string[]}
   */
  export const authRoutes = [
    "/login",
    "/auth/error",
  ];
  
  /**
   * The prefix for API authentication routes
   * Routes that start with this prefix are used for API authentication purposes
   * @type {string}
   */
  export const apiAuthPrefix = "/api/auth";
  
  /**
   * The default redirect path after logging in
   * @type {string}
   */
  export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
  export const ADMIN_LOGIN_REDIRECT = "/admin";
  export const MAIN_REDIRECT="/"