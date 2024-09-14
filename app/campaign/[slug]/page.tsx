import {
  CalendarIcon,
  DollarSignIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { StatusBadge } from "@/components/campaignsTable";
import { BarChartExample, PieChartExample } from "@/components/chartExaample";
import ImageUploadWithSupabase from "@/components/ImageUploadSupabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAccountById } from "@/lib/accounts/accountsService";
import { getCampaign } from "@/lib/campaign/campaignService";
import { createClient } from "@/utils/supabase/server";
import { formatMoney } from "@/utils/utils";

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

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-4" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-4xl">{campaign.name}</CardTitle>
              <CardContent className="flex flex-col gap-1 mt-2 my-2 py-2 px-0">
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-fuchsia-500" />
                  <span>Audience: {campaign.audience}</span>
                  {campaign.customAudience && (
                    <div className="flex items-center">
                      <span>({campaign.customAudience})</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-blue-400" />
                  <DateRange
                    start_date={campaign.start_date}
                    end_date={campaign.end_date}
                  />
                  <StatusBadge endDate={campaign.end_date} />
                </div>
                <div className="flex items-center gap-2">
                  <DollarSignIcon className="w-4 h-4 text-green-600" />
                  <span>Budget: {formatMoney(campaign.budget)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-yellow-400" />
                  <span>
                    Owner: {owner.first_name} {owner.last_name}
                  </span>
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

        <section className="">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BarChartExample />
            <PieChartExample />
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
      </div>
    </main>
  );
}

interface DateRangeProps {
  start_date: string; // Start date in ISO string format
  end_date: string; // End date in ISO string format
}

const DateRange: React.FC<DateRangeProps> = ({ start_date, end_date }) => {
  // Convert the date strings to Date objects
  const start = new Date(start_date);
  const end = new Date(end_date);

  // Format the start date
  const formattedStartDate = start.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  // Format the end date
  const formattedEndDate = end.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Combine the formatted dates into the desired string
  const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;

  return <span>{formattedDateRange}</span>;
};
