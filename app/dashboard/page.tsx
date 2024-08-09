import { ActivityIcon, DollarSignIcon, UsersIcon } from "lucide-react";
import { redirect } from "next/navigation";

import { CampaignTable } from "@/components/campaignsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAccountByAuthId } from "@/lib/accounts/accountsService";
import { getCampaigns } from "@/lib/campaign/campaignService";
import {
  formatBudget,
  getTotalActiveCampaigns,
  getTotalCampaigns,
} from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const account = await getAccountByAuthId(user.id);

  if (!account || !account.onboarded) {
    redirect("/welcome");
  }

  const campaigns = await getCampaigns(account.id);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Campaigns
            </CardTitle>
            <UsersIcon className="w-4 h-4 text-muted-foreground text-fuchsia-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getTotalCampaigns(campaigns)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <ActivityIcon className="w-4 h-4 text-muted-foreground text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getTotalActiveCampaigns(campaigns)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total budget spent
            </CardTitle>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBudget(campaigns)}</div>
          </CardContent>
        </Card>
      </div>
      <CampaignTable campaigns={campaigns} />
    </>
  );
}
