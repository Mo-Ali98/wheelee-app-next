import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

// Handle POST requests
export async function POST(req: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { first_name, last_name } = await req.json();

    // Validate input
    if (!first_name || !last_name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("Account")
      .insert([{ first_name, last_name, auth_id: user?.id, onboarded: true }])
      .single();

    if (error) {
      console.error("Error creating account:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Insert the new account into the database

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
