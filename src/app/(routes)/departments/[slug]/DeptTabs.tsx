"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { DepartmentTab } from "@/types";

export default function DeptTabs({ tabs }: { tabs: DepartmentTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  const renderDetails = (details: string | string[]) => {
    if (!details || details.length === 0) return null;
    if (typeof details === "string") {
      return <p className="text-neutral-600 leading-relaxed mt-3">{details}</p>;
    }
    return (
      <ul className="mt-3 space-y-3">
        {details.map((d, i) => (
          <li key={i} className="flex gap-3 text-neutral-600">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--color-accent)" }}></span>
            <span className="leading-relaxed">{d}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {/* Tab headers */}
      <div className="flex gap-1 p-1 bg-neutral-100 rounded-xl mb-6 flex-wrap">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "flex-1 min-w-fit px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
              active === i
                ? "bg-white text-blue-700 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div key={active} className="animate-fade-in">
        {tab.image && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 shadow-md">
            <Image
              src={tab.image}
              alt={tab.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
        )}
        {tab.intro && (
          <p className="text-neutral-700 leading-relaxed text-base">{tab.intro}</p>
        )}
        {renderDetails(tab.details)}
      </div>
    </div>
  );
}
