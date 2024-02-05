
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

// Defining an asynchronous function to handle POST requests
export async function POST(request: Request) {
  // Parsing the JSON body from the incoming request
  const body = await request.json();
  // Extracting relevant information from the request body
  const { name, email, password } = body;

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

  // Returning a JSON response with the newly created user
  return NextResponse.json(user);
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
