import NextAuth, { CredentialsSignin } from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel.js";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import db from "./dbconfig/dbconfig";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      authorize: async (credentials) => {
        try {
          const email = credentials?.email as string;
          const password = credentials?.password as string;

          if (!email || !password) {
            throw new CredentialsSignin("Please provide email and password");
          }

          await db(); // Connect to your database

          const user = await User.findOne({ email });

          if (!user) {
            throw new CredentialsSignin("User does not exist");
          }

          // Check the password
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            throw new CredentialsSignin("Password doesn't match");
          } else {
            // Return the user object for the session
            return {
              email: user.email,
              id: user._id.toString(),
              name: user.username,
              image: user.profilePicture,
              // You can add other non-sensitive user properties here
            };
          }
        } catch (error) {
          console.error("Authorization Error:", error);
          // Re-throw AuthError directly, or throw a generic AuthError for unexpected issues
          if (error instanceof AuthError) {
            throw error;
          }
          throw new CredentialsSignin(
            "An unexpected error occurred during authorization."
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user)
        {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.image = user.image || null;
        }
        await db();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.image = dbUser.profilePicture || null;
        }

        return token;
      },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image || null;
      }
      return session;
    },
  }
})
