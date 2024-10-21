import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user?.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Google Client Secret
      async profile(profile) {
        // Customize the data received from Google
        return {
          id: profile.sub, // Use Google's unique ID
          name: profile.name,
          email: profile.email,
          picture: profile.picture, // Optional: store profile picture
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },

    async signIn({ user, account }) {
      // If the user is signing in with Google
      if (account.provider === "google") {
        // Check if user already exists in your database
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // If the user does not exist, create a new user
        if (!existingUser) {
          await prisma.user.create({
            data: {
              id: user.id,
              name: user.name,
              email: user.email,
              // You can leave the password as null for Google sign-in
            },
          });
        }
      }
      return true; // Allow the sign-in process to continue
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
