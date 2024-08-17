import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAccountByAuthId } from "@/lib/accounts/accountsService";
import { createClient } from "@/utils/supabase/server";

export default async function Profile() {
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

  const name = `${account.first_name} ${account?.last_name}`;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Acme User" value={name} disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="acme@example.com"
                value={user?.email}
                disabled
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button disabled>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
