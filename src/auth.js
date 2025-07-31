import NextAuth, { AuthError } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel.js";
import bcrypt from "bcryptjs";
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
          const email = credentials?.email;
          const password = credentials?.password;

          if (!email || !password) {
            throw new AuthError("Please provide email and password");
          }

          await db();

          const user = await User.findOne({ email });
          if (!user) throw new AuthError("User does not exist");

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) throw new AuthError("Invalid credentials");

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username,
            image: user.profilePicture || null,
          };
        } catch (error) {
          console.error("Authorization Error:", error);
          throw new AuthError("Login failed. Please try again.");
        }
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      try {
        await db();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) token.image = dbUser.profilePicture || null;
      } catch (err) {
        console.error("JWT Callback Error:", err);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },
  },
});
