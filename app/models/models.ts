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
