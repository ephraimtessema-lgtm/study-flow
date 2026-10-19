export const appParams = {
  appId: import.meta.env.VITE_BASE44_APP_ID || "",
  token: import.meta.env.VITE_BASE44_ACCESS_TOKEN,
  functionsVersion: import.meta.env.VITE_BASE44_FUNCTIONS_VERSION,
  appBaseUrl:
    import.meta.env.VITE_BASE44_APP_BASE_URL ||
    (typeof window !== "undefined" ? window.location.origin : ""),
};
