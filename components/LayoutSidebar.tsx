import {
  LayoutDashboardIcon,
  LoaderPinwheelIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createClient } from "@/utils/supabase/server";

export default async function LayoutSideBar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div />;
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white dark:bg-neutral-900 dark:border-neutral-800 sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-fuchsia-500 text-lg font-semibold text-white md:h-8 md:w-8 md:text-base"
            prefetch={false}
          >
            <LoaderPinwheelIcon className="h-6 w-6 transition-all group-hover:scale-110" />
            <span className="sr-only">Wheelee</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-black dark:text-zinc-300 transition-colors hover:text-fuchsia-500 hover:bg-slate-100 dark:hover:bg-zinc-700 md:h-8 md:w-8"
                prefetch={false}
              >
                <LayoutDashboardIcon className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/new"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-black dark:text-zinc-300 transition-colors hover:text-fuchsia-500 hover:bg-slate-100 dark:hover:bg-zinc-700 md:h-8 md:w-8"
                prefetch={false}
              >
                <PlusIcon className="h-5 w-5" />
                <span className="sr-only">New Ad Campaign</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">New Ad Campaign</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-black dark:text-zinc-300 transition-colors hover:text-fuchsia-500 hover:bg-slate-100 dark:hover:bg-zinc-700 md:h-8 md:w-8"
                prefetch={false}
              >
                <SettingsIcon className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
