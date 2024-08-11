export const metadata = {
  title: "New Campaign",
  description: "Create a new add campaign",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function CampaignPageLayout({
  children,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <div className="flex-1 w-full flex flex-col gap-6 p-6">
      <h1 className="flex gap-2 items-center text-4xl font-medium"></h1>
      {children}
    </div>
  );
}
