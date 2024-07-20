import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <h1>Welcome user {user?.email}</h1>
    </div>
  );
}
