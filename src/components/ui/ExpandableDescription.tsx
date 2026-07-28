"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ExpandableDescription({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = paragraphs.length > 1;

  return (
    <div className="mb-8">
      <div
        className="space-y-3 text-neutral-600 leading-relaxed overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: expanded ? "1200px" : "160px" }}
      >
        {paragraphs.map((para, i) => (
          <p key={i}>{para.trim()}</p>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold mt-3 hover:gap-2 transition-all duration-200"
          style={{ color: "var(--color-primary)" }}
        >
          {expanded ? "Read less" : "Read more"}
          <ChevronDown
            className="w-4 h-4 transition-transform duration-300"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      )}
    </div>
  );
}
