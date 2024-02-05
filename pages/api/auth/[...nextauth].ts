import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";


export const authOptions: AuthOptions = {
  // Using Prisma as the adapter for NextAuth
  adapter: PrismaAdapter(prisma),

  // Configuring authentication providers
  providers: [
    // Configuring Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Configuring custom credentials provider (username/password)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      // Authorize function for handling custom credentials authentication
      async authorize(credentials) {
        // Checking if email or password is missing
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        // Fetching user from Prisma based on email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Checking if user or hashedPassword is missing
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        // Comparing input password with hashed password using bcrypt
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // If password is incorrect, throw error
        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        // If all checks pass, return the user
        return user;
      },
    }),
  ],

  // Configuring custom pages, in this case, the sign-in page
  pages: {
    signIn: "/login",
  },

  // Enabling debugging in development environment
  debug: process.env.NODE_ENV === "development",

  // Configuring session strategy as JWT (JSON Web Tokens)
  session: {
    strategy: "jwt",
  },

  // Secret key for securing NextAuth
  secret: process.env.NEXTAUTH_SECRET,
}
 
// Exporting the NextAuth configuration
export default NextAuth(authOptions);

