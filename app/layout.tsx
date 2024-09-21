import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

import LayoutHeader from "@/components/LayoutHeader";
import LayoutSideBar from "@/components/LayoutSidebar";
import { cn } from "@/utils/utils";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Wheelee",
  description: "Put Your Ad in Motion!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(GeistSans.className, "")}>
      <body className="bg-slate-50 text-black dark:bg-neutral-900 dark:text-zinc-300">
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <LayoutSideBar />
            <LayoutHeader />
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              {children}
              <SpeedInsights />
              <Analytics />
            </div>
          </div>
        </main>
        <footer className="w-full p-3 flex justify-center text-center text-xs sticky bottom-0 ">
          <p className="bg-gradient-to-r from-fuchsia-500 via-fuchsia-400 to-fuchsia-300 bg-clip-text text-transparent">
            Wheelee
          </p>
        </footer>
      </body>
    </html>
  );
}
