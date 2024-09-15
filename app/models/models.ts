export interface Account {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  auth_id: string;
  onboarded: boolean;
}

export interface OnboardingInfo {
  auth_id?: string;
  first_name?: string;
  last_name?: string;
  hasCompleted?: boolean;
}

export interface Campaign {
  id: string; // UUID as a string
  name: string; // Campaign name
  audience: string; // Target audience
  start_date: string; // Start date in ISO string format
  end_date: string; // End date in ISO string format
  budget: number; // Budget as a numeric value
  description: string; // Campaign description
  created_at: string; // Creation timestamp as ISO string
  createdBy: string; // Creator's UUID as a string
  customAudience: string; // Custom audience, if applicable
  image: string;
}

export interface CampaignDriver {
  id: string;
  campaign_id: string;
  earnings: number;
  distance_travelled: number;
  coordinates: JSON;
  status: string;
  user_id: string;
  time_travelled: number;
  created_at: string;
}
