import type { ReactNode } from "react";

/**
 * Props for the authentication layout.
 */
export interface AuthLayoutBaseProps {
  title?: string;
  description?: string;
  children: ReactNode;
}
