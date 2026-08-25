import type { ThemeOptions } from "@mui/material/styles";

const typography: ThemeOptions["typography"] = {
  fontFamily: "'Poppins', sans-serif",
  h1: { fontWeight: 600, fontSize: "2.25rem", lineHeight: "2.75rem" },
  h2: { fontWeight: 600, fontSize: "1.875rem", lineHeight: "2.25rem" },
  h3: { fontWeight: 600, fontSize: "1.5rem", lineHeight: "2rem" },
  h4: { fontWeight: 600, fontSize: "1.3125rem", lineHeight: "1.6rem" },
  h5: { fontWeight: 600, fontSize: "1.125rem", lineHeight: "1.6rem" },
  h6: { fontWeight: 600, fontSize: "1rem", lineHeight: "1.2rem" },
  subtitle1: { fontSize: "0.875rem", fontWeight: 400, lineHeight: "1.1rem" },
  subtitle2: { fontSize: "0.75rem", fontWeight: 400, lineHeight: "1rem" },
  body1: { fontSize: "0.875rem", fontWeight: 400, lineHeight: "1.334rem" },
  body2: { fontSize: "0.75rem", fontWeight: 400, lineHeight: "1rem" },
  caption: { fontSize: "0.75rem", fontWeight: 400 },
  overline: { fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase" },
  button: { fontSize: "0.875rem", fontWeight: 500, textTransform: "capitalize", letterSpacing: 0 },
};

export default typography;
