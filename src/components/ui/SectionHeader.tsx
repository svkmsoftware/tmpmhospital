import Image from "next/image";
import { cn } from "@/lib/utils";

// ── Section Header ─────────────────────────────────────────────────────────────
interface SectionHeaderProps {
  id?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  id,
  tag,
  title,
  subtitle,
  centered = true,
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {tag && (
        <p className={cn("section-tag", centered && "justify-center", light && "text-amber-300")}>
          <span className="w-6 h-px bg-current opacity-80"></span>
          {tag}
          <span className="w-6 h-px bg-current opacity-80"></span>
        </p>
      )}
      <h2
        id={id}
        className={cn("section-title", light ? "text-white" : "")}
      >
        {title}
      </h2>
      <div className={cn("divider-accent mt-3", centered ? "mx-auto" : "mx-0")}></div>
      {subtitle && (
        <p
          className={cn(
            "section-subtitle mt-4",
            centered && "mx-auto",
            light ? "text-cyan-100/80" : "",
            !centered && "text-left mx-0 max-w-none"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Page Banner ───────────────────────────────────────────────────────────────
interface PageBannerProps {
  image: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  height?: "sm" | "md" | "lg";
}

export function PageBanner({ image, title, subtitle, breadcrumb, height = "md" }: PageBannerProps) {
  const heights: Record<string, string> = {
    sm: "h-52 md:h-64",
    md: "h-64 md:h-80 lg:h-96",
    lg: "h-72 md:h-96 lg:h-[28rem]",
  };

  return (
    <section
      className={cn("relative w-full overflow-hidden flex items-end", heights[height])}
      aria-label={`${title} page banner`}
    >
      <Image
        src={image}
        alt={`${title} banner`}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      {/* Rich overlay: dark at bottom, lighter at top */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,30,55,0.85) 0%, rgba(7,30,55,0.4) 40%, rgba(0,0,0,0.15) 100%)" }}></div>

      <div className="relative container-custom pb-10 pt-16">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-2 text-xs text-cyan-200/80 flex-wrap">
              {breadcrumb.map((crumb, i) => (
                <li key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/30">/</span>}
                  {crumb.href ? (
                    <a href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</a>
                  ) : (
                    <span className="text-white font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl text-white text-balance leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-cyan-100/80 text-base md:text-lg max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
