// Importing necessary modules and packages
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

// Function to retrieve the session
export async function getSession() {
  // Retrieve the session using next-auth's getServerSession function and authOptions
  return await getServerSession(authOptions);
}

// Function to retrieve the current user
export async function getCurrentUser() {
  try {
    // Get the current session
    const session = await getSession();

    // If session or user email is missing, return null
    if (!session?.user?.email) {
      return null;
    }

    // Find the user in the database using the email from the session
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    // If currentUser is null, return null
    if (!currentUser) {
      return null;
    }

    // Remove the password hash so it is never sent to the client
    const { hashedPassword, ...user } = currentUser;

    // Return the currentUser with additional formatting of dates and emailVerified
    return {
      ...user,
      createdAt: currentUser.createdAt.toISOString(), // Format createdAt date to ISO string
      updatedAt: currentUser.updatedAt.toISOString(), // Format updatedAt date to ISO string
      emailVerified: currentUser.emailVerified?.toString() || null, // Convert emailVerified to string or null
    };
  } catch (error: any) {
    // Catch and handle any errors
    // You might want to log or handle errors here
    return null;
  }
}



// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { getServerSession } from "next-auth";
// import prisma from "@/libs/prismadb";

// export async function getSession() {
//   return await getServerSession(authOptions);
// }

// export async function getCurrentUser() {
//   try {
//     const session = await getSession();

//     if (!session?.user?.email) {
//       return null;
//     }

//     const currentUser = await prisma.user.findUnique({
//       where: {
//         email: session?.user?.email,
//       },
//     });

//     if (!currentUser) {
//       return null;
//     }

//     return {
//       ...currentUser,
//       createdAt: currentUser.createdAt.toISOString(),
//       updatedAt: currentUser.updatedAt.toISOString(),
//       emailVerified: currentUser.emailVerified?.toString() || null,
//     };
//   } catch (error: any) {}
// }
