// /app/auth/auth-code-error/page.tsx

import Link from "next/link";

export default function AuthCodeError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Authentication Error</h1>
      <p className="text-lg mb-6">
        There was a problem with your authentication code. Please try again or
        contact support if the issue persists.
      </p>
      <Link href="/login">Go back to Login</Link>
    </div>
  );
}
