"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push("/search");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex max-w-lg flex-1 items-center border rounded-full overflow-hidden bg-white">
      <input
        type="text"
        placeholder="Search"
        className="flex-1 px-4 py-2 outline-none text-sm bg-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="px-3 text-gray-700 hover:text-black"
        aria-label="Search"
      >
        <SearchIcon />
      </button>
    </div>
  );
}
