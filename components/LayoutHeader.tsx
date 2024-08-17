import {
  LayoutDashboardIcon,
  LoaderPinwheelIcon,
  MenuIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";

import AuthButton from "./AuthButton";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";

export default async function LayoutHeader() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <nav className="w-full flex justify-center border-b border-b-slate-300 h-16 p-10 sticky top-0 bg-slate-50/100 z-50">
        <div className="w-full max-w-4xl flex justify-between items-center">
          <Link
            href="/"
            className="flex flex-roe gap-2 items-center transition-all hover:scale-110"
          >
            <LoaderPinwheelIcon className="h-10 w-10 rounded-full bg-fuchsia-500 text-lg font-semibold text-white md:text-base p-1" />
            <span className="text-3xl bg-gradient-to-r from-fuchsia-500 via-fuchsia-500 to-fuchsia-400 bg-clip-text text-transparent">
              Wheelie
            </span>
          </Link>

          <AuthButton />
        </div>
      </nav>
    );
  }

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <SheetClose asChild>
                <Link
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-fuchsia-500 text-lg font-semibold text-white md:text-base"
                >
                  <LoaderPinwheelIcon className="h-6 w-6 transition-all group-hover:scale-110" />
                  <span className="sr-only">Wheelie</span>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 px-2.5 text-black hover:text-fuchsia-500"
                >
                  <LayoutDashboardIcon className="h-5 w-5" />
                  Dashboard
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/new"
                  className="flex items-center gap-4 px-2.5 text-black hover:text-fuchsia-500"
                >
                  <PlusIcon className="h-5 w-5" />
                  New Ad Campaign
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/profile"
                  className="flex items-center gap-4 px-2.5 text-black hover:text-fuchsia-500"
                >
                  <SettingsIcon className="h-5 w-5" />
                  Settings
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="relative ml-auto flex-1 md:grow-0"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <div className="bg-gradient-to-r from-fuchsia-500 via-fuchsia-400 to-fuchsia-300 overflow-hidden rounded-full h-8 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <AuthButton className="px-2 py-1.5 m-auto" />
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </div>
  );
}
