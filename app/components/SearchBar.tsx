"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}