const defaults = {
  API_URL: "https://samrat-voidcode.up.railway.app",
  CLERK_FRONTEND_API: "https://artistic-grackle-22.clerk.accounts.dev",
  CLERK_OAUTH_CLIENT_ID: "q3ToBcX6tBq5SWRf",
};

function envOrDefault(name: string, fallback: string) {
  const value = process.env[name];
  return value && value.trim() ? value : fallback;
}

export const config = {
  apiUrl: envOrDefault("API_URL", defaults.API_URL),
  clerkFrontendApi: envOrDefault("CLERK_FRONTEND_API", defaults.CLERK_FRONTEND_API),
  clerkOauthClientId: envOrDefault("CLERK_OAUTH_CLIENT_ID", defaults.CLERK_OAUTH_CLIENT_ID),
};
