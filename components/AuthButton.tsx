import Link from "next/link";

import { signOut } from "@/app/login/actions";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

import { Button } from "./ui/button";

interface AuthButtonProps {
  className?: string;
}

export default async function AuthButton({ className }: AuthButtonProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <form action={signOut}>
        <Button>Logout</Button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-black text-white"
    >
      Login
    </Link>
  );
}
