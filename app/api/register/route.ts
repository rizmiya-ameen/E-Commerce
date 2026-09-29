
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

// Defining an asynchronous function to handle POST requests
export async function POST(request: Request) {
  // Parsing the JSON body from the incoming request
  const body = await request.json();
  // Extracting relevant information from the request body
  const { name, email, password } = body;

  // Rejecting requests with missing fields
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing name, email or password" }, { status: 400 });
  }

  // Rejecting emails that are already registered
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "Email is already registered" }, { status: 409 });
  }

  // Hashing the password using bcrypt with a cost factor of 10
  const hashedPassword = await bcrypt.hash(password, 10);

  // Creating a new user in the database using Prisma
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  // Returning a JSON response with the newly created user (without the password hash)
  const { hashedPassword: _, ...safeUser } = user;
  return NextResponse.json(safeUser);
}

// import bcrypt from "bcrypt";
// import prisma from "@/libs/prismadb"
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const body = await request.json();
//   const { name, email, password } = body;

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await prisma.user.create({
//     data: {
//       name,
//       email,
//       hashedPassword,
//     },
//   });

//   return NextResponse.json(user)
// }
