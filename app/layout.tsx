import { GeistSans } from "geist/font/sans";
import "./globals.css";

import LayoutHeader from "@/components/LayoutHeader";
import LayoutSideBar from "@/components/LayoutSidebar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Wheelie",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-slate-50 text-black">
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <LayoutSideBar />
            <LayoutHeader />
            <div className="flex-1 w-full flex flex-col gap-20 items-center md:pl-14 md:pr-10">
              {children}
            </div>
            <footer className="w-full p-3 flex justify-center text-center text-xs">
              <p className="bg-gradient-to-r from-fuchsia-500 via-fuchsia-400 to-fuchsia-300 bg-clip-text text-transparent">
                Wheelie
              </p>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}
