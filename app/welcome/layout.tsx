import { OnboardingProvider } from "../contexts/onboarding.context";

export const metadata = {
  title: "Welcome",
  description: "Onboarding",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function WelcomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <div className="flex-1 w-full flex flex-col gap-6 p-6">{children}</div>
    </OnboardingProvider>
  );
}
