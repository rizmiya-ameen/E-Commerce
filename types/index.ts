import { User } from "@prisma/client"

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified" | "hashedPassword"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}

// This code defines a new type called SafeUser. It's created by using TypeScript's Omit utility type to exclude certain properties from the User type (createdAt, updatedAt, and emailVerified). Then, it extends the type with the same property names but with their types changed to string.

// in summary, SafeUser is a modified version of the User type where certain sensitive properties are omitted and replaced with string types for createdAt, updatedAt, and emailVerified.

// At schema.prisma
/*
model User {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  name           String?
  email          String?   @unique
  emailVerified  DateTime?
  image          String?
  hashedPassword String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  role           Role      @default(USER)

  accounts Account[]
}
*/

//At getCurrentUser.ts -> But we changed the types of createdAt, updatedAt, emailVerified to string
/*
return {
//       ...currentUser,
//       createdAt: currentUser.createdAt.toISOString(),
//       updatedAt: currentUser.updatedAt.toISOString(),
//       emailVerified: currentUser.emailVerified?.toString() || null,
//     }
*/