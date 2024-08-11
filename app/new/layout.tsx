import { PlusIcon } from "lucide-react";

export const metadata = {
  title: "New Campaign",
  description: "Create a new add campaign",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function NewCampaignLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 w-full flex flex-col gap-6 p-6">
      <h1 className="flex gap-2 items-center font-medium text-2xl lg:text-4xl">
        <PlusIcon className="h-6 w-6 lg:h-8 lg:w-8" />
        New Ad Campaign
      </h1>
      {children}
    </div>
  );
}
