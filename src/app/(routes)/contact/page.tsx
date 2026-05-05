import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SVKM's TMPM Hospital. Find our address, phone numbers, email, and use our online contact form to book appointments or send enquiries.",
  alternates: { canonical: "https://www.tmpmhospital.com/contact" },
};

const contactDetails = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["SVKM's Tapanbhai Mukeshbhai Patel", "Memorial Hospital, Kharde, Budruk,", "Shirpur, Dhule — 425405, Maharashtra"],
    color: "bg-cyan-50",
    iconColor: "var(--color-primary)",
  },
  {
    icon: Phone,
    title: "Phone / Emergency",
    lines: ["Emergency: +91 12345 67890", "OPD Helpline: +91 98765 43210", "Available 24 × 7"],
    color: "bg-red-50",
    iconColor: "#ef4444",
    href: "tel:+911234567890",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["contact@tmpmhospital.com", "careers@tmpmhospital.com"],
    color: "bg-emerald-50",
    iconColor: "#10b981",
    href: "mailto:contact@tmpmhospital.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["OPD: 8:00 AM – 8:00 PM (Mon–Sat)", "Emergency: 24 × 7 · 365 days", "Sunday: Emergency only"],
    color: "bg-amber-50",
    iconColor: "#f59e0b",
  },
];

export default function ContactPage() {
  return (
    <>

      <PageBanner
        image="/images/departments_banner.png"
        title="Contact Us"
        subtitle="We're here to help — reach us by phone, email, or visit us in person."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        height="sm"
      />

      <section id="contact" className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            tag="Get In Touch"
            title="How Can We Help?"
            subtitle="Use the form below to send us an enquiry, or reach us directly using the contact details."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact details */}
            <div className="space-y-5">
              {contactDetails.map(({ icon: Icon, title, lines, color, iconColor, href }) => (
                <div key={title} className="card p-5 flex gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                    <Icon className="w-5 h-5" color={iconColor} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">{title}</h3>
                    {lines.map((line, i) =>
                      href && i === 0 ? (
                        <a key={i} href={href} className="text-sm text-neutral-600 hover:text-cyan-700 transition-colors block">
                          {line}
                        </a>
                      ) : (
                        <p key={i} className="text-sm text-neutral-500">{line}</p>
                      )
                    )}
                  </div>
                </div>
              ))}

              {/* Tariff download */}
              <div className="card p-5 flex gap-4" style={{ background: "#eff6ff" }}>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-1">Hospital Tariff</h3>
                  <p className="text-sm text-neutral-500 mb-2">Download our charges / tariff sheet.</p>
                  <a
                    href="https://drive.google.com/file/d/1gSUJYhNeN7v6-uOkmAAZN5aL_Uak-Vuu/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium underline"
                    style={{ color: "var(--color-primary)" }}
                  >
                    View / Download PDF
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="bg-neutral-100">
        <div className="h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3738.0!2d74.8929!3d21.3492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDIwJzU3LjEiTiA3NMKwNTMnMzQuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SVKM TMPM Hospital Location Map"
          />
        </div>
      </section>
    </>
  );
}
