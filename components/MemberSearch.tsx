"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";

export default function MemberSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);

  // Get the current search value from URL
  const currentSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(currentSearch);

  // Create a function to update the URL with the search parameter
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Update the URL with the search parameter
    router.push(`${pathname}?${createQueryString("search", searchValue)}`);

    // Reset the searching state after navigation
    setTimeout(() => setIsSearching(false), 300);
  };

  const handleClear = () => {
    setSearchValue("");
    router.push(pathname);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Rechercher par nom ou prénom..."
            className="w-full p-2 border rounded-md"
          />
          {currentSearch && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSearching ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Rechercher"
          )}
        </button>
      </div>
    </form>
  );
}
