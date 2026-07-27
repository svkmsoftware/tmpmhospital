import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Info, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactDetail {
  label: string;
  value: string;
}

interface ContactInfoBandProps {
  heading?: string;
  subheading?: string;
  details: ContactDetail[];
}

// ── Detect a phone-shaped value regardless of label wording ────────────────
function looksLikePhone(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function firstTelNumber(value: string) {
  // handles values like "+91-2563-351503/04" — link only the first full number
  const firstBlock = value.split("/")[0];
  const digits = firstBlock.replace(/[^\d+]/g, "");
  return digits;
}

function detailMeta(d: ContactDetail) {
  const label = d.label.toLowerCase();
  const value = d.value.trim();

  if (label.includes("email") || value.includes("@")) {
    return { Icon: Mail, href: `mailto:${value}`, cta: "Send email" };
  }
  if (label.includes("location") || label.includes("address") || label.includes("visit")) {
    return {
      Icon: MapPin,
      href: `https://www.google.com/maps/search/${encodeURIComponent(value)}`,
      cta: "Get directions",
    };
  }
  if (label.includes("hour") || label.includes("timing") || label.includes("opd")) {
    return { Icon: Clock, href: undefined, cta: undefined };
  }
  if (label.includes("call") || label.includes("phone") || label.includes("emergency") || looksLikePhone(value)) {
    const tel = firstTelNumber(value);
    return { Icon: Phone, href: tel ? `tel:${tel}` : undefined, cta: "Call now" };
  }
  return { Icon: Info, href: undefined, cta: undefined };
}

export default function ContactInfoBand({
  heading = "Need Assistance?",
  subheading = "Our team is here to help with appointments, visits, and any questions you have.",
  details,
}: ContactInfoBandProps) {
  if (!details?.length) return null;

  return (
    <div className="mt-16 rounded-3xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(4,86,168,0.35)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
        {/* ── Left: message + primary CTA ─────────────────────────────── */}
        <div
          className="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0456A8 0%, #063E7D 60%, #08A2A4 130%)" }}
        >
          <div
            className="absolute -top-20 -left-16 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "#ffffff" }}
            aria-hidden
          />
          <span className="relative text-[11px] font-semibold tracking-[0.16em] uppercase text-cyan-100/80 mb-3">
            Patient Support
          </span>
          <h3
            className="relative text-3xl sm:text-4xl text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display, serif)" }}
          >
            {heading}
          </h3>
          <p className="relative text-cyan-100/85 text-[15px] leading-relaxed max-w-sm mb-8">
            {subheading}
          </p>
          <Link
            href="/contact"
            className="relative inline-flex w-fit items-center gap-2 bg-white text-[#0456A8] font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-cyan-50 transition-colors shadow-lg"
          >
            Book an Appointment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Right: stacked contact list ──────────────────────────────── */}
        <div className="bg-white p-2 sm:p-3">
          {details.map((d, i) => {
            const { Icon, href, cta } = detailMeta(d);
            const isExternal = href?.startsWith("http");
            const Wrapper = href ? "a" : "div";
            const wrapperProps = href
              ? { href, target: isExternal ? "_blank" : undefined, rel: isExternal ? "noopener noreferrer" : undefined }
              : {};

            return (
              <Wrapper
                key={i}
                {...wrapperProps}
                className={cn(
                  "group flex items-center gap-4 sm:gap-5 px-4 sm:px-6 py-5 rounded-2xl transition-colors duration-200",
                  href && "hover:bg-[#0456A808] cursor-pointer",
                  i !== details.length - 1 && "border-b border-neutral-100",
                )}
              >
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                  style={{ background: "#0456A80D", color: "#0456A8" }}
                >
                  <Icon className="w-5 h-5" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-neutral-400 text-[11px] font-semibold uppercase tracking-wide mb-0.5">
                    {d.label}
                  </p>
                  <p className="text-neutral-800 font-semibold text-[15px] leading-snug break-words">
                    {d.value}
                  </p>
                </div>

                {href && (
                  <span className="shrink-0 flex items-center gap-1 text-[13px] font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#08A2A4" }}>
                    <span className="hidden sm:inline">{cta}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
