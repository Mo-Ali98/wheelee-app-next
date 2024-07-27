import { redirect } from "next/navigation";

import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";

import { emailLogin, signUp } from "./actions";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card>
        <CardHeader />
        <CardContent className="mt-5">
          <form className="flex-1 flex flex-col w-full justify-center gap-5 text-black">
            <div className="flex flex-col gap-1">
              <label className="text-md mb-1" htmlFor="email">
                Email
              </label>
              <Input name="email" placeholder="you@example.com" required />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-md mb-1" htmlFor="password">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            <SubmitButton
              formAction={emailLogin}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-md px-4 py-2 mb-2"
              pendingText="Signing In..."
            >
              Sign In
            </SubmitButton>
            <SubmitButton
              formAction={signUp}
              className="border border-slate-300 hover:bg-slate-100 rounded-md px-4 py-2 mb-2"
              pendingText="Signing Up..."
            >
              Sign Up
            </SubmitButton>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-blue-300 text-white text-center rounded-md">
                {searchParams.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
