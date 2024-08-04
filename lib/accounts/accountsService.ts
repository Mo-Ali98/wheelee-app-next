// lib/Accountervice.ts
// Actions only for server components
import { type Account } from "@/app/models/models";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getAccounts() {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("Error getting user:", authError.message);
    throw new Error(authError.message);
  }

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const { data, error } = await supabase.from("Account").select("*");

  if (error) {
    console.error("Error fetching accounts:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function getAccountByAuthId(authId: string): Promise<Account> {
  const { data, error } = await supabase
    .from("Account") // Ensure the table name is correct
    .select("*")
    .eq("auth_id", authId); // Filter by authId

  if (error) {
    console.error("Error fetching account:", error.message);
    throw new Error(error.message);
  }

  return data[0];
}

export async function updateAccount(
  authId: string,
  data: Partial<{ username: string }>
) {
  const { error } = await supabase
    .from("Account")
    .update(data)
    .eq("auth_id", authId);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export async function deleteAccount(authId: string) {
  const { error } = await supabase
    .from("Account")
    .delete()
    .eq("auth_id", authId);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
