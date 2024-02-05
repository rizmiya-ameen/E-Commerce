//adding prisma client globally

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
}

// Declares a global variable named prisma: This means the variable can be accessed from anywhere in your application.
// Type annotation PrismaClient | undefined: This specifies that the prisma variable can either hold a PrismaClient instance or be undefined.

const client = globalThis.prisma || new PrismaClient()

// Checks for an existing client: This line first checks if a PrismaClient instance has already been created and stored in the global prisma variable.
// Creates a new client if needed: If no existing client is found, a new instance of PrismaClient is created.

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

// Conditional assignment: This code only runs in development environments (not production).
// Assigns client to global prisma: It assigns the created PrismaClient instance to the global prisma variable, making it accessible throughout the application.
// Rationale: This pattern is often used to prevent creating multiple Prisma client instances in development, which can lead to issues during hot reloading. In production, it's usually recommended to create the client once and reuse it.

export default client