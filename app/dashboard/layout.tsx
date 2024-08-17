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
    <div className="flex flex-1 gap-4 w-full md:pl-14 md:pr-10">
      <main className="flex flex-col flex-1 items-start gap-6 p-6 w-full">
        <h1 className="flex gap-2 items-center font-medium text-2xl lg:text-4xl">
          <LayoutDashboardIcon className="h-6 w-6 lg:h-8 lg:w-8" />
          Dashboard
        </h1>
        {children}
      </main>
    </div>
  );
}
