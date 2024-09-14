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

export function generateRandomCoordinatesInLondon(
  numPoints: number
): [number, number][] {
  const bounds = {
    latMin: 51.28676, // Southern bound of London
    latMax: 51.691874, // Northern bound of London
    lonMin: -0.510375, // Western bound of London
    lonMax: 0.334015, // Eastern bound of London
  };

  const coordinates: [number, number][] = [];

  for (let i = 0; i < numPoints; i++) {
    const lat = bounds.latMin + Math.random() * (bounds.latMax - bounds.latMin);
    const lon = bounds.lonMin + Math.random() * (bounds.lonMax - bounds.lonMin);
    coordinates.push([lat, lon]);
  }

  return coordinates;
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
