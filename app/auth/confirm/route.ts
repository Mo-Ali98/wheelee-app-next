import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const code = searchParams.get("code");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  console.log(searchParams);
  if (token_hash && type) {
    const supabase = createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (type == "recovery" && code) {
      console.log("recovery");
    }

    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  console.error("Error verifying OTP with token:", token_hash);

  redirectTo.pathname = "/auth/error";
  // return the user to an error page with some instructions
  return NextResponse.redirect(redirectTo);
}
