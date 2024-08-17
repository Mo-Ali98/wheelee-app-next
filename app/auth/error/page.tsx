import AuthButton from "@/components/AuthButton";

export default function AuthCodeError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Authentication Error</h1>
      <p className="text-lg mb-6">
        Please try again or contact support if the issue persists.
      </p>
      <AuthButton />
    </div>
  );
}
