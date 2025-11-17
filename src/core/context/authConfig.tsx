type AuthStyle = "boxed" | "side";

export const AUTH_STYLE: AuthStyle =
  ((import.meta.env.VITE_AUTH_STYLE as string) || "boxed").toLowerCase() ===
  "side"
    ? "side"
    : "boxed";
