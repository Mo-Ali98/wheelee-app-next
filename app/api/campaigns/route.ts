import { type NextRequest, NextResponse } from "next/server";

import { getAccountByAuthId } from "@/lib/accounts/accountsService";
import { createClient } from "@/utils/supabase/server";

// Handle POST requests
export async function POST(req: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not authenticated" }, { status: 400 });
  }

  const account = await getAccountByAuthId(user.id);

  try {
    const {
      name,
      audience,
      customAudience,
      startDate,
      endDate,
      budget,
      description,
    } = await req.json();

    // Validate input
    if (
      !name ||
      !audience ||
      !startDate ||
      !endDate ||
      !budget ||
      !description
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("Campaign")
      .insert([
        {
          name,
          audience,
          customAudience,
          start_date: startDate,
          end_date: endDate,
          budget,
          description,
          createdBy: account.id,
        },
      ])
      .single();

    console.log(error);

    if (error) {
      console.error("Error creating campaign:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Insert the new account into the database

    return NextResponse.json(
      { message: "Campaign created successfully!" },
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
