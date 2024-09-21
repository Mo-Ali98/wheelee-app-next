import Link from "next/link";

import { signOut } from "@/app/auth/actions";
import { createClient } from "@/utils/supabase/server";
import { cn } from "@/utils/utils";

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
        <Button className="dark:text-zinc-300">Logout</Button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-md px-4 py-2"
    >
      Login
    </Link>
  );
}
