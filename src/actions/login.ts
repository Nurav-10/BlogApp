
import { signIn } from "next-auth/react";
import db from "@/dbconfig/dbconfig";
import { CredentialsSignin } from "next-auth";
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
    console.log(error);
    const err = error as CredentialsSignin;
    return err.message;
  }
};
