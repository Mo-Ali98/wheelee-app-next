import { SettingsIcon } from "lucide-react";

export const metadata = {
  title: "Settings",
  description: "My Settings",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function ProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 w-full flex flex-col gap-6 p-6">
      <h1 className="flex gap-2 items-center font-medium text-2xl lg:text-4xl">
        <SettingsIcon className="h-6 w-6 lg:h-8 lg:w-8" />
        Settings
      </h1>
      {children}
    </div>
  );
}
