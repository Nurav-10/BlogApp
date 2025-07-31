import { signIn } from "next-auth/react";

export const loginHandler = async (email: string, password: string) => {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res || res.error) {
      return res?.error || "Login failed";
    }

    return null; // No error
  } catch (error) {
    console.error("Login Error:", error);
    const err = error as Error; // ✅ use Error type
    return err.message || "Something went wrong";
  }
};
