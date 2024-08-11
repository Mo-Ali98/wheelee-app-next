import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import NewCampaignForm from "../containers/new-campaign";

export default async function NewCampaign() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return <NewCampaignForm />;
}
