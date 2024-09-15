import {
  CalendarIcon,
  Clock,
  DollarSignIcon,
  Route,
  UserIcon,
  Users,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import BudgetBreakdown from "@/components/BudgetBreakdown";
import { StatusBadge } from "@/components/campaignsTable";
import { BarChartExample, PieChartExample } from "@/components/chartExaample";
import ImageUploadWithSupabase from "@/components/ImageUploadSupabase";
import HotspotMapRoute from "@/components/MapWithRoute";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAccountById } from "@/lib/accounts/accountsService";
import {
  getCampaign,
  getCampaignDriverAggregates,
} from "@/lib/campaign/campaignService";
import { createClient } from "@/utils/supabase/server";
import { formatDate, formatMoney } from "@/utils/utils";

export default async function Campaign({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const campaign = await getCampaign(params.slug);
  const owner = await getAccountById(campaign.createdBy);

  if (!user || !campaign) {
    return redirect("/");
  }

  const { totalDrivers, totalDistanceTravelled, totalHours } =
    await getCampaignDriverAggregates(campaign.id);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-4" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-4xl font-bold">
                {campaign.name}
              </CardTitle>

              <CardContent className="grid gap-4 p-0 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-fuchsia-500" />
                    <span className="text-md font-medium">Audience:</span>
                    <Badge variant="secondary">{campaign.audience}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSignIcon className="w-5 h-5 text-green-600" />
                    <span className="text-md font-medium">Budget:</span>
                    <Badge variant="secondary">
                      {formatMoney(campaign.budget)}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-5 h-5 text-yellow-400" />
                    <span className="text-md font-medium">Owner:</span>
                    <span className="text-md">
                      {owner.first_name} {owner.last_name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5 text-blue-400" />
                    <span className="text-md font-medium">Duration:</span>
                    <span className="text-md">
                      {formatDate(campaign.start_date)} to{" "}
                      {formatDate(campaign.end_date)}
                    </span>
                    <StatusBadge endDate={campaign.end_date} />
                  </div>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Description</CardTitle>
              <CardContent className="text-balance leading-relaxed p-2">
                {campaign.description}
              </CardContent>
            </CardHeader>
          </Card>
        </div>

        <section className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total Drivers"
              value={totalDrivers}
              icon={Users}
              subValue="For this campaign"
            />
            <StatCard
              title="Total Hours Driven"
              value={totalHours}
              icon={Clock}
              subValue="Across all drivers"
            />
            <StatCard
              title="Total Distance"
              value={`${totalDistanceTravelled} km`}
              icon={Route}
              subValue="Across all drivers"
            />
          </div>

          <div className="grid gap-4 grid-cols-1">
            <HotspotMapRoute />
          </div>
        </section>
      </div>
      <div className="flex flex-col gap-8">
        <Card className="space-y-6">
          <CardHeader className="pb-3">
            <CardTitle>Ad Poster</CardTitle>
            <CardContent className="text-balance leading-relaxed p-2">
              {campaign.image ? (
                <Image
                  src={campaign.image}
                  alt="Poster"
                  className="mx-auto aspect-[2/1] overflow-hidden rounded-xl object-cover"
                  width={500}
                  height={500}
                />
              ) : (
                <ImageUploadWithSupabase campaignId={campaign.id} />
              )}
            </CardContent>
          </CardHeader>
        </Card>
        <BudgetBreakdown totalBudget={campaign.budget} className="space-y-6" />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <BarChartExample />
          <PieChartExample />
        </div>
      </div>
    </main>
  );
}
