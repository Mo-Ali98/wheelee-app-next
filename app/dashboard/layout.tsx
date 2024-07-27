import { LayoutDashboardIcon } from "lucide-react";

export const metadata = {
  title: "Dashboard",
  description: "My Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 gap-4 w-full">
      <main className="flex flex-col flex-1 items-start gap-6 p-6 w-full">
        <h1 className="flex gap-2 items-center text-4xl font-medium">
          <LayoutDashboardIcon className="h-8 w-8" />
          Dashboard
        </h1>
        {children}
      </main>
    </div>
  );
}
