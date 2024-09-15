// Actions only for server components

import { type Campaign, type CampaignDriver } from "@/app/models/models";
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

export async function getCampaign(campaignId: string): Promise<Campaign> {
  const { data, error } = await supabase
    .from("Campaign")
    .select("*")
    .eq("id", campaignId)
    .single();

  if (error) {
    console.error("Error fetching accounts:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function getCampaignDrivers(
  campaignId: string
): Promise<CampaignDriver[]> {
  const { data, error } = await supabase
    .from("user_campaign")
    .select("*")
    .eq("campaign_id", campaignId);

  if (error) {
    console.error("Error fetching user campaigns:", error);
    return [];
  }

  return data;
}

interface UserCampaignAggregates {
  totalDrivers: number;
  totalDistanceTravelled: number;
  totalHours: number;
}

export async function getCampaignDriverAggregates(
  campaignId: string
): Promise<UserCampaignAggregates> {
  // Fetch all columns from user_campaigns for the given campaign_id
  const { data, error } = await supabase
    .from("user_campaign")
    .select("*")
    .eq("campaign_id", campaignId);

  if (error || !data) {
    console.error("Error fetching user campaigns:", error);
    // Return 0s if there's an error or no data
    return {
      totalDrivers: 0,
      totalDistanceTravelled: 0,
      totalHours: 0,
    };
  }

  // Aggregate the data
  const totalDrivers = new Set(data.map((item) => item.user_id)).size;
  const totalDistanceTravelled = data.reduce(
    (acc, item) => acc + (item.distance_travelled || 0),
    0
  );
  const totalHours = data.reduce(
    (acc, item) => acc + (item.time_travelled || 0),
    0
  );

  return {
    totalDrivers,
    totalDistanceTravelled,
    totalHours,
  };
}
