import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { resetPassword } from "../auth/actions";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset your password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your new password
            </p>
          </div>

          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                name="newPassword"
                required
              />
            </div>
            <SubmitButton formAction={resetPassword} pendingText="...">
              Reset password
            </SubmitButton>
          </form>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-blue-500 text-white text-center rounded-md">
              {searchParams.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
