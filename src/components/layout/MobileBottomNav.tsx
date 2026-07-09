"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Stethoscope, CalendarCheck, Phone, MapPin, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

const leftItems: BottomNavItem[] = [
  { label: "Doctors", href: "/doctors", icon: Stethoscope },
  { label: "Book Appt", href: "/contact", icon: CalendarCheck },
];

const rightItems: BottomNavItem[] = [
  { label: "Call Us", href: "tel:+912563351503", icon: Phone, external: true },
  {
    label: "Find Us",
    href: "https://maps.google.com/?q=Shirpur+Hospital+Maharashtra",
    icon: MapPin,
    external: true,
  },
];

function NavTab({ item, isActive }: { item: BottomNavItem; isActive: boolean }) {
  const Icon = item.icon;
  const content = (
    <div className="flex flex-col items-center justify-center gap-1 py-2">
      <Icon
        className={cn(
          "w-5 h-5 transition-colors",
          isActive ? "text-cyan-700" : "text-neutral-500",
        )}
        strokeWidth={isActive ? 2.25 : 2}
      />
      <span
        className={cn(
          "text-[10px] font-semibold leading-none transition-colors",
          isActive ? "text-cyan-700" : "text-neutral-500",
        )}
      >
        {item.label}
      </span>
    </div>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="flex-1 flex items-center justify-center"
        aria-label={item.label}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className="flex-1 flex items-center justify-center" aria-label={item.label}>
      {content}
    </Link>
  );
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 xl:hidden bg-white border-t border-neutral-100"
      style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}
      aria-label="Quick access"
    >
      <div className="relative grid grid-cols-5 items-center h-16 px-1">
        {leftItems.map((item) => (
          <NavTab key={item.label} item={item} isActive={isActive(item.href)} />
        ))}

        {/* Center: elevated hospital logo, links home */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            aria-label="SVKM TMPM Hospital — Home"
            className="absolute -top-6 flex flex-col items-center gap-1"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white"
              style={{ background: "var(--gradient-main)" }}
            >
              <Image
                src="/images/hospital_logo_mnc.png"
                alt="SVKM TMPM Hospital"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <span className="text-[10px] font-semibold text-cyan-700 leading-none">
              Home
            </span>
          </Link>
        </div>

        {rightItems.map((item) => (
          <NavTab key={item.label} item={item} isActive={isActive(item.href)} />
        ))}
      </div>
    </nav>
  );
}
