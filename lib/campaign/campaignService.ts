// Actions only for server components
import { type Campaign } from "@/app/models/models";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getCampaigns(accountId: number): Promise<Campaign[]> {
  const { data, error } = await supabase
    .from("Campaign")
    .select("*")
    .eq("createdBy", accountId);

  if (error) {
    console.error("Error fetching accounts:", error.message);
    throw new Error(error.message);
  }

  return data;
}
