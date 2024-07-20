import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Link from "next/link";

import AuthButton from "@/components/AuthButton";

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
      <body className="bg-white text-black">
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center border-b border-b-slate-300 h-16 sticky top-0">
              <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                <Link className="text-[hsl(280,100%,70%)] text-lg" href={"/"}>
                  Wheelie
                </Link>
                <AuthButton />
              </div>
            </nav>

            {children}

            <footer className="w-full border-t border-t-slate-300 p-3 flex justify-center text-center text-xs">
              <p className="text-[hsl(280,100%,70%)]">Wheelie</p>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}
