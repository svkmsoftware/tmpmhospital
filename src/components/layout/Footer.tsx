import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Departments & Services", href: "/departments" },
    { label: "Find a Doctor", href: "/doctors" },
    { label: "Careers", href: "/careers" },
    { label: "Photo Gallery", href: "/gallery" },
    { label: "Blogs", href: "/blogs" },
  ],
  patientServices: [
    { label: "OPD Services", href: "/opd" },
    { label: "IPD Services", href: "/ipd" },
    { label: "Day Care", href: "/day-care" },
    { label: "TPA & Insurance", href: "/tpa-insurance" },
    {
      label: "Tariff / Charges",
      href: "https://drive.google.com/file/d/1gSUJYhNeN7v6-uOkmAAZN5aL_Uak-Vuu/view?usp=sharing",
      external: true,
    },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative text-white/80 overflow-hidden"
      style={{ background: "var(--gradient-main)" }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Decorative dot pattern, matching ContactCTA */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 70%, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      ></div>

      {/* ── Emergency strip ─────────────────────────────────────────────────── */}
      <div className="relative py-4 bg-black/15 border-b border-white/10">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Phone className="w-5 h-5" />
            Emergency Helpline:{" "}
            <a
              href="tel:+912563351503"
              className="underline hover:text-white/80"
            >
              +91 2563 351503/04
            </a>
          </div>
          <p className="text-white/80 text-sm">
            Available 24 × 7 · 365 days a year
          </p>
        </div>
      </div>

      {/* ── Main footer ─────────────────────────────────────────────────────── */}
      <div className="relative container-custom py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/hospital_website_logo_1.png"
                alt="SVKM TMPM Hospital"
                width={200}
                height={54}
                style={{ height: "3rem", width: "auto" }}
                className="object-contain bg-white rounded-lg px-2 py-1"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/70 mb-5">
              SVKM&apos;s Tapanbhai Mukeshbhai Patel Memorial Hospital &amp;
              Research Center — a 1200-bed multispecialty hospital in Shirpur
              delivering world-class, affordable healthcare to tribal and rural
              communities of Maharashtra.
            </p>

            {/* Address */}
            <address className="not-italic text-sm text-white/70 space-y-2 mb-5">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white" />
                <span>
                  Kharde, Budruk, Shirpur, Dhule — 425405, Maharashtra
                </span>
              </div>
              <div className="flex gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-white" />
                <a
                  href="mailto:contact.tmpmh@svkm.ac.in"
                  className="hover:text-white transition-colors"
                >
                  contact.tmpmh@svkm.ac.in
                </a>
              </div>
            </address>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/50 group-hover:bg-white transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Patient Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.patientServices.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={
                      "external" in link && link.external ? "_blank" : undefined
                    }
                    rel={
                      "external" in link && link.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/50 group-hover:bg-white transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Find Us
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2204.1302710641085!2d74.87466393876052!3d21.33888429342791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdf2d0000fe6e4b%3A0x75a40f1477d0d050!2sTapanbhai%20Mukesh%20Bhai%20Patel%20Memorial%20hospital%20shirpur!5e1!3m2!1sen!2sin!4v1782803598577!5m2!1sen!2sin"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TMPM Hospital Location"
                aria-label="Hospital location map"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Shirpur+Hospital+Maharashtra"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-xs text-white/70 hover:text-white flex items-center gap-1 transition-colors"
            >
              <MapPin className="w-3 h-3" />
              Get directions
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────────────── */}
      <div className="relative border-t border-white/15 bg-black/10">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>
            © {year} SVKM&apos;s Tapanbhai Mukeshbhai Patel Memorial Hospital
            &amp; Research Center. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
