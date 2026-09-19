export type AuthIntent = "login" | "signup";

export type AllauthError = {
  code: string;
  message: string;
  param?: string;
};

export type AllauthUser = {
  id: number;
  email: string;
  username: string;
  has_usable_password?: boolean;
};

export type AllauthResponse = {
  status: number;
  data?: {
    user?: AllauthUser;
    flows?: Array<{ id: string; is_pending?: boolean }>;
  };
  meta: {
    is_authenticated: boolean;
  };
  errors?: AllauthError[];
};
