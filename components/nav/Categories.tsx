"use client";

import { categories } from "@/utils/categories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Container from "../Container";

const Categories = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = searchParams?.get("category") ?? "All";

  // Only show the category bar on the home page
  if (pathname !== "/") return null;

  const handleClick = (label: string) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (label === "All") {
      params.delete("category");
    } else {
      params.set("category", label);
    }

    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  };

  return (
    <div className="bg-white border-b">
      <Container>
        <div className="flex items-center gap-2 overflow-x-auto py-3">
          {categories.map((item) => {
            const isSelected = selected === item.label;
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() => handleClick(item.label)}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full border text-sm whitespace-nowrap transition ${
                  isSelected
                    ? "bg-slate-700 text-white border-slate-700"
                    : "border-slate-300 text-slate-600 hover:border-slate-500"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
