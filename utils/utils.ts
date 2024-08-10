import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { type Campaign } from "@/app/models/models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Calculate the total number of campaigns
export const getTotalCampaigns = (campaigns: Campaign[]): number => {
  return campaigns.length;
};

// Calculate the total number of active campaigns
export const getTotalActiveCampaigns = (campaigns: Campaign[]): number => {
  const today = new Date();
  return campaigns.filter((campaign) => new Date(campaign.end_date) >= today)
    .length;
};

// Calculate the total budget
export const getTotalBudget = (campaigns: Campaign[]): number => {
  return campaigns.reduce((total, campaign) => total + campaign.budget, 0);
};

export const formatBudget = (campaigns: Campaign[]): string => {
  const amount = getTotalBudget(campaigns);
  return `£${amount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatMoney = (amount: number): string => {
  return `£${amount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
