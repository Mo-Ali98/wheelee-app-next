import Link from "next/link";

import { signOut } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-purple-700 hover:bg-purple-600 text-white">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-purple-700 hover:bg-purple-600 text-white"
    >
      Login
    </Link>
  );
}
