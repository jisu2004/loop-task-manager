"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.replace("/auth/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl rounded-xl bg-white p-10 text-center shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600">
          🎉 Welcome to LOOP Dashboard
        </h1>

        <p className="mt-4 text-gray-600">
          You have successfully logged in.
        </p>

        <button
          onClick={handleLogout}
          className="mt-8 rounded-lg bg-red-600 px-6 py-3 text-white"
        >
          Logout
        </button>
      </div>
    </main>
  );
}