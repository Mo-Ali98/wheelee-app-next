import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { getCampaign } from "@/lib/campaign/campaignService";
import { createClient } from "@/utils/supabase/server";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const campaign = await getCampaign(params.slug);

  return {
    title: campaign.name || "",
    description: campaign.description || "",
  };
}

export default function CampaignPageLayout({
  children,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <div className="flex-1 w-full flex flex-col gap-6 p-6  md:pl-14 md:pr-10">
      <h1 className="flex gap-2 items-center text-4xl font-medium"></h1>
      {children}
    </div>
  );
}
