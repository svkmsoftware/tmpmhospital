import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, CalendarClock, Users2, CheckCircle2 } from "lucide-react";

interface JobCardProps {
  title: string;
  department?: string | null;
  location?: string | null;
  applyBy?: string | null;
  posts?: number | null;
  qualifications?: (string | null | undefined)[] | null;
}

export default function JobCard({
  title,
  department,
  location,
  applyBy,
  posts,
  qualifications,
}: JobCardProps) {
  const postCount = posts ?? 1;
  const cleanQualifications = (qualifications ?? []).filter(
    (q): q is string => typeof q === "string" && q.trim().length > 0
  );
  return (
    <div className="card relative flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Accent top edge */}
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))" }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
            <Briefcase className="h-4 w-4" color="var(--color-primary)" />
          </span>
          <h3 className="font-bold leading-snug text-neutral-800">{title}</h3>
        </div>
        <span className="badge badge-primary shrink-0 whitespace-nowrap text-2xs">
          {postCount} post{postCount > 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-500">
        {department && (
          <span className="inline-flex items-center gap-1.5">
            <Users2 className="h-3.5 w-3.5" color="var(--color-accent)" />
            {department}
          </span>
        )}
        {location && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" color="var(--color-accent)" />
            {location}
          </span>
        )}
        {applyBy && (
          <span className="inline-flex items-center gap-1.5">
            <CalendarClock className="h-3.5 w-3.5" color="var(--color-accent)" />
            Apply by {applyBy}
          </span>
        )}
      </div>

      {cleanQualifications.length > 0 && (
        <div className="mt-4 flex-1">
          <p className="mb-2 text-2xs font-semibold uppercase tracking-wide text-neutral-400">
            Qualifications
          </p>
          <ul className="space-y-1.5">
            {cleanQualifications.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-neutral-600">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" color="var(--color-accent)" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link href="/contact" className="btn-gradient mt-5 w-full justify-center py-2.5 text-sm">
        Apply Now <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
