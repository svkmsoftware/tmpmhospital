"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { firstNameOf, type DepartmentGroup } from "@/lib/doctors";
import type { Doctor } from "@/types";

const ALL_FILTER = "all";

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const designation = doctor.tags[0] ?? "";

  // Carry image + designation (+ name) through the URL as a defensive
  // fallback for the detail page's lookup — harmless now that this list is
  // always local (ids always match), but keeps the detail page resilient if
  // that ever changes.
  const profileQuery = new URLSearchParams({
    image: doctor.profilePhoto,
    designation,
    name: doctor.name,
  }).toString();

  return (
    <div className="card group text-center">
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={doctor.profilePhoto}
          alt={doctor.name}
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-neutral-800 mb-1 text-base truncate" title={doctor.name}>
          {doctor.name}
        </h3>
        <p className="text-xs font-semibold mb-3 text-primary">{designation}</p>
        <div className="flex gap-2">
          <Link
            href={`/doctors/${doctor.id}?${profileQuery}`}
            className="flex-1 btn-outline text-xs py-2 px-3 flex items-center justify-center gap-1"
          >
            <User className="w-3 h-3" /> Profile
          </Link>
          <Link
            href="/contact"
            className="flex-1 btn-gradient text-xs py-2 px-3 flex items-center justify-center gap-1"
          >
            <Phone className="w-3 h-3" /> Book
          </Link>
        </div>
      </div>
    </div>
  );
}

export function DoctorDirectory({ groups }: { groups: DepartmentGroup[] }) {
  const [activeSlug, setActiveSlug] = useState<string>(ALL_FILTER);

  // "All" is every doctor, flattened back into one alphabetical-by-first-name
  // list (each group is already sorted that way, but flattening groups in
  // department order isn't the same as one global alphabetical pass).
  const allDoctorsSorted = useMemo(() => {
    const flat = groups.flatMap((g) => g.doctors);
    return [...flat].sort((a, b) =>
      firstNameOf(a.name).localeCompare(firstNameOf(b.name)),
    );
  }, [groups]);

  const activeGroup = groups.find((g) => g.slug === activeSlug);
  const visibleDoctors = activeSlug === ALL_FILTER ? allDoctorsSorted : activeGroup?.doctors ?? [];

  return (
    <div>
      {/* Filter bar */}
      <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-3 md:p-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          <FilterPill
            label="All Specialists"
            count={allDoctorsSorted.length}
            active={activeSlug === ALL_FILTER}
            onClick={() => setActiveSlug(ALL_FILTER)}
          />
          {groups.map((g) => (
            <FilterPill
              key={g.slug}
              label={g.title}
              count={g.doctors.length}
              active={activeSlug === g.slug}
              onClick={() => setActiveSlug(g.slug)}
            />
          ))}
        </div>
      </div>

      {/* Results */}
      {visibleDoctors.length === 0 ? (
        <p className="text-center text-neutral-500 py-12">No doctors found.</p>
      ) : (
        <div
          key={activeSlug}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children animate-fade-in-up"
        >
          {visibleDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold",
        "transition-all duration-200 select-none whitespace-nowrap",
        active
          ? "bg-gradient-main text-white shadow-glow-cyan"
          : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary hover:text-primary hover:shadow-card",
      )}
    >
      {label}
      <span
        className={cn(
          "inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-[10px] font-bold",
          active ? "bg-white/25 text-white" : "bg-primary-pale text-primary",
        )}
      >
        {count}
      </span>
    </button>
  );
}
