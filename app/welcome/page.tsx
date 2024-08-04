import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { Onboarding } from "../containers/onboarding-container";

export default async function Welcome() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return <Onboarding />;
}
