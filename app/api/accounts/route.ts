import { type NextRequest, NextResponse } from "next/server";

import { createAccount } from "@/lib/accounts/accountsService";

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { first_name, last_name } = await req.json();

    // Validate the input
    if (!first_name || !last_name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert the new account into the database
    await createAccount({ first_name, last_name });

    return NextResponse.json(
      { message: "Account created successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
