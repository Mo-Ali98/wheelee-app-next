import {
  CalendarIcon,
  DollarSignIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { redirect } from "next/navigation";

import { StatusBadge } from "@/components/campaignsTable";
import { BarChartExample, PieChartExample } from "@/components/chartExaample";
import { getAccountById } from "@/lib/accounts/accountsService";
import { getCampaign } from "@/lib/campaign/campaignService";
import { createClient } from "@/utils/supabase/server";

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
    <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 p-4 md:p-6 lg:p-8">
      <div>
        <section className="">
          <div className="container">
            <div className="grid gap-6 md:gap-8 lg:gap-10">
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-medium tracking-tighter sm:text-4xl md:text-5xl">
                  {campaign.name}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <div className="flex items-center space-x-2 ">
                    <UsersIcon className="w-4 h-4 text-fuchsia-500" />
                    <span>Audience: {campaign.audience}</span>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <CalendarIcon className="h-4 w-4 text-blue-400" />
                    <DateRange
                      start_date={campaign.start_date}
                      end_date={campaign.end_date}
                    />
                    <StatusBadge endDate={campaign.end_date} />
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <DollarSignIcon className="w-4 h-4 text-green-600" />
                    <span>Budget: $50,000</span>
                  </div>
                </div>
              </div>
              <div className="prose max-w-[800px]">
                <h2 className="text-xl mb-2">Campaign Description</h2>
                <p>{campaign.description}</p>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BarChartExample />
                <PieChartExample />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="rounded-lg p-4 md:p-6 lg:p-8 space-y-6 shadow-md">
        <div>
          <h2 className="text-lg font-bold">Campaign Details</h2>
          <div className="mt-4 grid gap-2">
            <div className="flex items-center space-x-2 ">
              <UsersIcon className="w-4 h-4 text-fuchsia-500" />
              <span>
                Creator: {owner.first_name} {owner.last_name}
              </span>
            </div>
            <div className="flex items-center space-x-2 ">
              <CalendarIcon className="h-4 w-4 text-blue-400" />
              <DateRange
                start_date={campaign.start_date}
                end_date={campaign.end_date}
              />
            </div>
            {campaign.customAudience && (
              <div className="flex items-center space-x-2 ">
                <UsersIcon className="h-4 w-4" />
                <span>Custom Audience: {campaign.customAudience}</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">Performance</h2>
          <div className="mt-4 grid gap-2">
            <div className="flex items-center space-x-2 ">
              <TrendingUpIcon className="h-4 w-4 text-green-500" />
              <span>Impressions: 1.2M</span>
            </div>
            <div className="flex items-center space-x-2 ">
              <TrendingUpIcon className="h-4 w-4 text-green-500" />
              <span>Clicks: 120K</span>
            </div>
            <div className="flex items-center space-x-2 ">
              <TrendingUpIcon className="h-4 w-4 text-green-500" />
              <span>Conversions: 15K</span>
            </div>
          </div>
        </div>
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
