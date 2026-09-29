"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTerm = searchParams?.get("searchTerm") ?? "";
  const [term, setTerm] = useState(currentTerm);

  // Keep the input in sync when the URL changes (e.g. back button)
  useEffect(() => {
    setTerm(currentTerm);
  }, [currentTerm]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams?.toString());
    const trimmed = term.trim();

    if (trimmed) {
      params.set("searchTerm", trimmed);
    } else {
      params.delete("searchTerm");
    }

    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center w-full max-w-md">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        type="search"
        placeholder="Search products..."
        aria-label="Search products"
        className="p-2 w-full border border-gray-300 rounded-l-md bg-white focus:outline-none focus:border-slate-500"
      />
      <button
        type="submit"
        aria-label="Search"
        className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md border border-slate-700"
      >
        <AiOutlineSearch size={22} />
      </button>
    </form>
  );
};

export default SearchBar;
