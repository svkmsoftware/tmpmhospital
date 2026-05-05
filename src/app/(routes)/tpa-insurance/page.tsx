import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileText, Shield } from "lucide-react";
import { SectionHeader, PageBanner } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getInsuranceCompanies } from "@/lib/api";

export const metadata: Metadata = {
  title: "TPA, Insurance & Corporate",
  description: "SVKM's TMPM Hospital is empanelled with leading TPA and insurance providers. Find cashless insurance partners and corporate billing information.",
  alternates: { canonical: "https://www.tmpmhospital.com/tpa-insurance" },
};

const infoCards = [
  {
    icon: Shield,
    title: "Cashless Treatment",
    desc: "Avail cashless hospitalization with our empanelled TPA and insurance partners. Present your insurance card at admission for hassle-free processing.",
  },
  {
    icon: FileText,
    title: "Reimbursement Claims",
    desc: "Our billing team will assist you with all necessary documentation for reimbursement claims, ensuring a smooth and quick process.",
  },
  {
    icon: ExternalLink,
    title: "Corporate Tie-Ups",
    desc: "We offer corporate billing and health packages for organizations. Contact our helpdesk for details on corporate empanelment.",
  },
];

export default async function TpaInsurancePage() {
  const { data: companies } = await getInsuranceCompanies();

  return (
    <>

      <PageBanner
        image="/images/general_hospital_banner.png"
        title="TPA, Insurance & Corporate"
        subtitle="Cashless and seamless billing with all major insurance providers."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Patients & Visitors" },
          { label: "TPA & Insurance" },
        ]}
        height="sm"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            tag="Billing & Insurance"
            title="Insurance & TPA Partners"
            subtitle="We are empanelled with leading insurance providers to ensure seamless cashless treatment for our patients."
          />

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 stagger-children">
            {infoCards.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 text-center flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "#dbeafe" }}>
                  <Icon className="w-7 h-7" color="var(--color-primary)" />
                </div>
                <h3 className="font-bold text-neutral-800">{title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Insurance companies grid */}
          <h2 className="text-2xl font-bold text-neutral-800 mb-2 text-center">Our Insurance Partners</h2>
          <div className="divider-accent mx-auto mb-8"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 stagger-children">
            {companies.map((company) => (
              <a
                key={company.id}
                href={company.docLink}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-5 flex flex-col items-center gap-3 group hover:border-cyan-200 border border-transparent transition-all"
                aria-label={`${company.name} — view documents`}
              >
                <div className="relative w-full h-16">
                  <Image
                    src={company.imageUrl}
                    alt={company.name}
                    fill
                    className="object-contain transition-opacity group-hover:opacity-80"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <p className="text-xs font-medium text-neutral-600 text-center">{company.name}</p>
                <span className="flex items-center gap-1 text-2xs font-semibold" style={{ color: "var(--color-primary)" }}>
                  View Docs <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>

          {/* Tariff */}
          <div className="mt-14 rounded-2xl p-8 text-center" style={{ background: "#eff6ff" }}>
            <h3 className="text-xl font-bold text-neutral-800 mb-2">Hospital Charges / Tariff</h3>
            <p className="text-neutral-500 mb-5 max-w-md mx-auto">
              Download our official tariff sheet to understand the estimated costs for various procedures and services.
            </p>
            <a
              href="https://drive.google.com/file/d/1gSUJYhNeN7v6-uOkmAAZN5aL_Uak-Vuu/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              <FileText className="w-4 h-4" />
              Download Tariff Sheet
            </a>
          </div>

          {/* Contact for queries */}
          <div className="mt-8 text-center">
            <p className="text-neutral-500 text-sm mb-3">For billing and insurance queries, contact our helpdesk:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+911234567890" className="btn-outline text-sm py-2 px-4">Call Helpdesk</a>
              <Link href="/contact" className="btn-primary text-sm py-2 px-4">Send Enquiry</Link>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
