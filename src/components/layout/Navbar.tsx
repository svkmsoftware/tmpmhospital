"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, Phone, Mail,
  Facebook, Instagram, Linkedin, Twitter, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { departments } from "@/data/departments";
import GoogleTranslate from "@/components/ui/GoogleTranslate";

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us", href: "/about",
    children: [
      { label: "Overview", href: "/about#about" },
      { label: "Vision & Mission", href: "/about#vision-mission" },
      { label: "Founders & Leadership", href: "/about#leadership" },
      { label: "Management Team", href: "/about#management" },
      { label: "Why Choose Us", href: "/about#why-choose-us" },
    ],
  },
  {
    label: "Departments", href: "/departments",
    children: [
      { label: "All Departments", href: "/departments" },
      ...departments.map((cat) => ({
        label: cat.category,
        children: cat.items.map((item) => ({
          label: item.title,
          href: `/departments/${item.slug}`,
        })),
      })),
    ],
  },
  { label: "Doctors", href: "/doctors" },
  {
    label: "Patients & Visitors",
    children: [
      {
        label: "Services",
        children: [
          { label: "OPD", href: "/opd" },
          { label: "IPD", href: "/ipd" },
          { label: "Day Care", href: "/day-care" },
          { label: "Emergency", href: "/contact#emergency" },
        ],
      },
      {
        label: "Billing & Insurance",
        children: [
          { label: "Tariff / Charges", href: "https://drive.google.com/file/d/1gSUJYhNeN7v6-uOkmAAZN5aL_Uak-Vuu/view?usp=sharing", external: true },
          { label: "TPA, Insurance & Corporate", href: "/tpa-insurance" },
        ],
      },
    ],
  },
  {
    label: "Community",
    children: [
      { label: "Blogs & News", href: "/blogs" },
      { label: "Photo Gallery", href: "/gallery" },
    ],
  },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

// ── Desktop: recursive submenu ────────────────────────────────────────────────
function DesktopSubMenu({
  items,
  depth = 0,
  onClose,
}: {
  items: NavItem[];
  depth?: number;
  onClose: () => void;
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHoverIdx(i);
  };
  const leave = () => {
    timerRef.current = setTimeout(() => setHoverIdx(null), 100);
  };
  const keepAlive = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <ul
      className="bg-white rounded-2xl py-2 min-w-[220px]"
      style={{ boxShadow: depth === 0 ? "0 20px 60px -10px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)" : "0 8px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)" }}
    >
      {items.map((item, i) => {
        const hasChildren = !!item.children?.length;
        const isHovered = hoverIdx === i;
        return (
          <li
            key={i}
            className="relative px-2"
            onMouseEnter={() => hasChildren && enter(i)}
            onMouseLeave={() => hasChildren && leave()}
          >
            {hasChildren ? (
              <>
                <button
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 gap-2",
                    isHovered
                      ? "bg-blue-50 text-blue-700"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                  )}
                  aria-expanded={isHovered}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronRight className={cn("w-3.5 h-3.5 shrink-0 transition-transform duration-200", isHovered && "translate-x-0.5")} />
                </button>

                {/* Nested menu */}
                <div
                  className={cn(
                    "absolute left-full top-0 z-10 transition-all duration-200",
                    isHovered ? "opacity-100 translate-x-1 pointer-events-auto" : "opacity-0 translate-x-0 pointer-events-none"
                  )}
                  style={{ marginLeft: "4px" }}
                  onMouseEnter={keepAlive}
                  onMouseLeave={leave}
                >
                  <DesktopSubMenu items={item.children!} depth={depth + 1} onClose={onClose} />
                </div>
              </>
            ) : item.href ? (
              <Link
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={onClose}
                className="flex items-center px-3 py-2.5 rounded-xl text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-all duration-150"
              >
                {item.label}
              </Link>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

// ── Desktop top-level nav item ─────────────────────────────────────────────────
function DesktopNavItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setOpen(true), 50);
  };
  const scheduleClose = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  };
  const keepAlive = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  if (!item.children) {
    return (
      <Link
        href={item.href!}
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-xl transition-all duration-150 whitespace-nowrap",
          isActive ? "text-blue-700 bg-blue-50" : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-150 whitespace-nowrap",
          isActive || open ? "text-blue-700 bg-blue-50" : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {/* Dropdown with smooth fade+slide */}
      <div
        className={cn(
          "absolute top-full left-0 z-50 pt-2 transition-all duration-200 origin-top-left",
          open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
        )}
        onMouseEnter={keepAlive}
        onMouseLeave={scheduleClose}
      >
        <DesktopSubMenu items={item.children} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}

// ── Mobile accordion item ─────────────────────────────────────────────────────
function MobileNavItem({ item, onClose, depth = 0 }: { item: NavItem; onClose: () => void; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!item.children?.length;
  const pathname = usePathname();
  const isActive = item.href ? (pathname === item.href || pathname.startsWith(item.href + "/")) : false;
  const pl = 16 + depth * 16;

  return (
    <div>
      {hasChildren ? (
        <>
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "w-full flex items-center justify-between py-3 text-sm font-medium transition-colors border-b border-neutral-100",
              depth === 0 ? "text-neutral-800" : "text-neutral-600",
              open && "text-blue-700"
            )}
            style={{ paddingLeft: `${pl}px`, paddingRight: "16px" }}
          >
            {item.label}
            <ChevronDown className={cn("w-4 h-4 shrink-0 transition-transform duration-300", open && "rotate-180")} />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            )}
            style={{ background: depth === 0 ? "#f9fafb" : "#f3f4f6" }}
          >
            {item.children!.map((child, i) => (
              <MobileNavItem key={i} item={child} onClose={onClose} depth={depth + 1} />
            ))}
          </div>
        </>
      ) : item.href ? (
        <Link
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          onClick={onClose}
          className={cn(
            "flex items-center gap-2 py-3 text-sm border-b border-neutral-100 transition-colors",
            depth === 0 ? "font-medium text-neutral-800" : "text-neutral-500",
            isActive && "text-blue-700 font-semibold"
          )}
          style={{ paddingLeft: `${pl}px`, paddingRight: "16px" }}
        >
          {depth > 0 && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--color-accent)" }} />}
          {item.label}
        </Link>
      ) : null}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => { closeMobile(); }, [pathname, closeMobile]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") closeMobile(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMobile]);

  return (
    <header
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled && "shadow-lg")}
      role="banner"
    >
      {/* Top bar */}
      <div className="hidden md:block" style={{ background: "var(--color-primary)" }}>
        <div className="container-custom flex items-center justify-between py-1.5">
          <div className="flex items-center gap-5 text-xs text-blue-100">
            <a href="mailto:contact@tmpmhospital.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" /> contact@tmpmhospital.com
            </a>
            <a href="tel:+911234567890" className="flex items-center gap-1.5 hover:text-white transition-colors font-semibold text-white">
              <Phone className="w-3.5 h-3.5" /> Emergency: +91 12345 67890
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              {[{ Icon: Facebook, href: "#", label: "Facebook" }, { Icon: Instagram, href: "#", label: "Instagram" }, { Icon: Linkedin, href: "#", label: "LinkedIn" }, { Icon: Twitter, href: "#", label: "Twitter" }].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="text-blue-200 hover:text-white transition-colors"><Icon className="w-3.5 h-3.5" /></a>
              ))}
            </div>
            <div className="border-l border-white/20 pl-4">
              <GoogleTranslate variant="dark" />
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={cn("bg-white border-b border-neutral-100 transition-shadow duration-300", scrolled && "shadow-sm")}>
        <div className="container-custom flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="SVKM TMPM Hospital — Home">
            <Image src="/images/hospital_website_logo.png" alt="SVKM TMPM Hospital" width={220} height={60} style={{ height: "3rem", width: "auto" }} className="object-contain" priority />
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5" aria-label="Main navigation">
            {navItems.map((item, i) => {
              const isActive = !!item.href && (pathname === item.href || pathname.startsWith(item.href + "/"));
              return <DesktopNavItem key={i} item={item} isActive={isActive} />;
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="xl:hidden">
              <GoogleTranslate variant="light" />
            </div>
            <Link href="/contact" className="hidden sm:inline-flex btn-primary text-sm py-2 px-4">Book Appointment</Link>
            <button
              className="xl:hidden p-2 rounded-xl text-neutral-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={cn("fixed inset-0 bg-black/50 z-40 xl:hidden transition-opacity duration-300", mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none")}
        onClick={closeMobile}
        aria-hidden
      />

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col xl:hidden transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ background: "var(--color-primary)" }}>
          <Image src="/images/hospital_website_logo.png" alt="TMPM Hospital" width={160} height={44} style={{ height: "2.25rem", width: "auto" }} className="object-contain brightness-0 invert" />
          <button onClick={closeMobile} className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-colors" aria-label="Close navigation">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto overscroll-contain py-1">
          {navItems.map((item, i) => <MobileNavItem key={i} item={item} onClose={closeMobile} />)}
        </div>

        {/* CTA footer */}
        <div className="p-4 border-t border-neutral-100 space-y-3 shrink-0">
          <Link href="/contact" className="btn-primary w-full justify-center text-sm" onClick={closeMobile}>
            <Phone className="w-4 h-4" /> Book Appointment
          </Link>
          <a href="tel:+911234567890" className="flex items-center justify-center gap-2 text-xs text-neutral-400 hover:text-red-500 transition-colors">
            <Phone className="w-3 h-3" /> Emergency: +91 12345 67890
          </a>
        </div>
      </div>
    </header>
  );
}
