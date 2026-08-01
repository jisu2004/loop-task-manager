"use client";

import { LogOut, CalendarDays } from "lucide-react";

interface NavbarProps {
  userName: string;
  onLogout: () => void;
}

export default function Navbar({
  userName,
  onLogout,
}: NavbarProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const initial =
    userName?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            LOOP
          </h1>

          <p className="text-sm text-gray-500">
            Task Management Dashboard
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Date */}
          <div className="hidden md:flex items-center gap-2 text-gray-500 text-sm">
            <CalendarDays size={18} />
            <span>{today}</span>
          </div>

          {/* User */}
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              {initial}
            </div>

            <div className="hidden sm:block">
              <p className="text-xs text-gray-500">
                Welcome Back
              </p>

              <p className="font-semibold text-gray-800">
                {userName}
              </p>
            </div>

          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-600 hover:shadow-lg"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">
              Logout
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
}