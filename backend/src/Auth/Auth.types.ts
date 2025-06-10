
export type Register={
  username: string,
  email: string,
  password : string,
}

export type RegisterResponse =
  | { success: true }
  | { success: false; error: "user_exists" | "internal_error" };


export type LoginResponse =
  | { success: true; token: string }
  | { success: false; error: "user_not_found" | "invalid_password" | "internal_error" };
