import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import ContactForm from "@/app/(routes)/contact/ContactForm";
import { getContactPageData } from "@/lib/graphql/services";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with SVKM's TMPM Hospital. Find our location, phone numbers, email address, and book an appointment.",
  alternates: { canonical: "https://www.tmpmhospital.com/contact" },
};

const defaultContactItems = [
  { icon: MapPin,  label: "Location",   value: "SVKM's TMPM Hospital, Kharde Budruk, Shirpur, Dhule – 425405, Maharashtra" },
  { icon: Phone,   label: "Call Us",    value: "+91 2563 351503/04"            },
  { icon: Mail,    label: "Email Us",   value: "contact.tmpmh@svkm.ac.in"   },
  { icon: Clock,   label: "OPD Hours",  value: "Mon – Sat: 8:00 AM – 8:00 PM" },
];

const iconMap: Record<string, typeof Phone> = {
  Location: MapPin, Call: Phone, "Call Us": Phone,
  Email: Mail, "Email Us": Mail, Hours: Clock, OPD: Clock,
};

export default async function ContactPage() {
  let gqlContact = null;
  try { gqlContact = await getContactPageData(); } catch { /* use local fallback */ }

  const contactItems = gqlContact?.details?.length
    ? gqlContact.details.map((d) => {
        const Icon = Object.entries(iconMap).find(([k]) => d.label.includes(k))?.[1] ?? MapPin;
        return { icon: Icon, label: d.label, value: d.value };
      })
    : defaultContactItems;

  return (
    <>
      <PageBanner image="/images/general_hospital_banner.png" title="Contact Us"
        subtitle="We are here to help. Reach out with questions, feedback, or to book an appointment."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <p className="section-tag"><span className="w-6 h-px bg-current"></span>Get In Touch</p>
                <h2 className="section-title text-3xl">
                  {gqlContact?.heading ?? "We'd Love to Hear From You"}
                </h2>
                <div className="divider-accent mb-4"></div>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {gqlContact?.subheading ?? "Our team is available 24×7 for emergencies and during OPD hours for general enquiries."}
                </p>
              </div>

              <div className="space-y-4">
                {contactItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-cyan-200 hover:bg-cyan-50/50 transition-all">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                         style={{ background: "var(--color-primary-pale)" }}>
                      <Icon className="w-5 h-5" color="var(--color-primary)" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-800 text-sm">{label}</p>
                      <p className="text-neutral-500 text-sm leading-relaxed">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency CTA */}
              <div className="rounded-2xl p-5 text-white" style={{ background: "var(--gradient-main)" }}>
                <p className="font-bold mb-1 text-white">Emergency Services</p>
                <p className="text-white/80 text-sm mb-3">Available 24 hours, 7 days a week</p>
                <a href="tel:+912563351503"
                   className="inline-flex items-center gap-2 bg-white rounded-xl px-4 py-2 text-sm font-bold"
                   style={{ color: "var(--color-primary)" }}>
                  <Phone className="w-4 h-4" /> Call Emergency
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-80 bg-neutral-100 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.123!2d74.88!3d21.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSVKM+TMPM+Hospital+Shirpur!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" title="SVKM TMPM Hospital Location"
          className="w-full h-full"
        />
      </section>
    </>
  );
}
