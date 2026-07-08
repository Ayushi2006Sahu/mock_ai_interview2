import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-full h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-8 sm:p-12 max-w-md w-full text-center shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Welcome Back!</h2>
        <p className="text-gray-400 mb-6">
          Sign in to access your account.
        </p>

        {/* Proper Redirect */}
        <div className="rounded-lg p-4 bg-gray-900 border border-gray-700 shadow-md">
          <SignIn 
            redirectUrl="/dashboard" 
            afterSignInUrl="/dashboard"
            afterSignUpUrl="/dashboard"
          />
        </div>
      </div>
    </main>
  );
}
