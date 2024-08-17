import Image from "next/image";
import { redirect } from "next/navigation";

import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";

import placeholder from "../../assets/placeholder.svg";
import { requestPasswordReset } from "../auth/actions";

export default async function ForgotPassword({
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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:max-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot your password?</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to reset your password
            </p>
          </div>

          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                name="email"
                required
              />
            </div>
            <SubmitButton
              formAction={requestPasswordReset}
              pendingText="Sending Link..."
            >
              Send reset link
            </SubmitButton>
          </form>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-blue-500 text-white text-center rounded-md">
              {searchParams.message}
            </p>
          )}
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={placeholder}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
