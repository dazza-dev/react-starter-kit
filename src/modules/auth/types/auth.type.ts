export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthRole {
  uuid: string;
  name: string;
  slug: string;
}

/**
 * Authenticated user's profile as returned by `auth/login` and `auth/profile`, already including effective permissions.
 */
export interface AuthUser {
  uuid: string;
  name: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  username: string;
  avatar: string | null;
  roles: AuthRole[];
  isAdmin: boolean;
  permissions: string[];
}

export interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  // Empty means "don't change the password".
  password: string;
  passwordConfirmation: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
