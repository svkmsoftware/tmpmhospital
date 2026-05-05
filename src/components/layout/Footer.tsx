import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, Clock } from "lucide-react";

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
    { label: "Tariff / Charges", href: "https://drive.google.com/file/d/1gSUJYhNeN7v6-uOkmAAZN5aL_Uak-Vuu/view?usp=sharing", external: true },
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
    <footer className="bg-neutral-900 text-neutral-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* ── Emergency strip ─────────────────────────────────────────────────── */}
      <div className="py-4" style={{ background: "var(--gradient-main)" }}>
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Phone className="w-5 h-5" />
            Emergency Helpline: <a href="tel:+911234567890" className="underline hover:text-white/80">+91 12345 67890</a>
          </div>
          <p className="text-white/80 text-sm">Available 24 × 7 · 365 days a year</p>
        </div>
      </div>

      {/* ── Main footer ─────────────────────────────────────────────────────── */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/hospital_website_logo.png"
                alt="SVKM TMPM Hospital"
                width={200}
                height={54}
                style={{ height: "3rem", width: "auto" }}
                className="object-contain brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 mb-5">
              SVKM&apos;s Tapanbhai Mukeshbhai Patel Memorial Hospital &amp; Research Center — a 1200-bed multispecialty hospital in Shirpur delivering world-class, affordable healthcare to tribal and rural communities of Maharashtra.
            </p>

            {/* Address */}
            <address className="not-italic text-sm text-neutral-400 space-y-2 mb-5">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent-DEFAULT" color="var(--color-accent)" />
                <span>Kharde, Budruk, Shirpur, Dhule — 425405, Maharashtra</span>
              </div>
              <div className="flex gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" color="var(--color-accent)" />
                <a href="mailto:contact@tmpmhospital.com" className="hover:text-white transition-colors">
                  contact@tmpmhospital.com
                </a>
              </div>
              <div className="flex gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" color="var(--color-accent)" />
                <span>OPD: 8:00 AM – 8:00 PM · Emergency: 24 × 7</span>
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
                  className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-cyan-600 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:bg-accent-DEFAULT transition-colors" style={{ background: "var(--gradient-main)" }}></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Patient Services</h3>
            <ul className="space-y-2.5">
              {footerLinks.patientServices.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={"external" in link && link.external ? "_blank" : undefined}
                    rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full transition-colors" style={{ background: "var(--gradient-main)" }}></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Find Us</h3>
            <div className="rounded-xl overflow-hidden border border-neutral-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3738.0!2d74.8929!3d21.3492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDIwJzU3LjEiTiA3NMKwNTMnMzQuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
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
              className="mt-2 text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <MapPin className="w-3 h-3" />
              Get directions
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────────────── */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {year} SVKM&apos;s Tapanbhai Mukeshbhai Patel Memorial Hospital &amp; Research Center. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-neutral-300 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
