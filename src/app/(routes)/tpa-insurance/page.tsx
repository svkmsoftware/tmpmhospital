import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileText, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeader, PageBanner } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getInsuranceCompanies } from "@/lib/api";
import { aboutData } from "@/data/about";

export const metadata: Metadata = {
  title: "TPA, Insurance & Corporate",
  description:
    "SVKM's TMPM Hospital is empanelled with leading TPA, insurance providers, and government health schemes including PMJAY, MJPJAY, ESIC, CGHS, and more.",
  alternates: { canonical: "https://www.tmpmhospital.com/tpa-insurance" },
};

const infoCards = [
  {
    icon: Shield,
    title: "Cashless Treatment",
    desc: "Avail cashless hospitalisation with our empanelled TPA and insurance partners. Present your insurance card at admission for hassle-free processing.",
  },
  {
    icon: FileText,
    title: "Reimbursement Claims",
    desc: "Our billing team assists you with all documentation for reimbursement claims, ensuring a smooth and quick process.",
  },
  {
    icon: ExternalLink,
    title: "Corporate & Govt. Tie-Ups",
    desc: "We offer corporate billing, health packages, and are empanelled with 20+ central and state government health schemes.",
  },
];

export default async function TpaInsurancePage() {
  const { data: companies } = await getInsuranceCompanies();

  return (
    <>
      <PageBanner
        image="/images/general_hospital_banner.png"
        title="TPA, Insurance & Corporate"
        subtitle="Cashless and seamless billing with all major insurance providers and government health schemes."
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
            subtitle="We are empanelled with leading insurance providers to ensure seamless cashless treatment."
          />

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 stagger-children">
            {infoCards.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 text-center flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                     style={{ background: "var(--color-primary-pale)" }}>
                  <Icon className="w-7 h-7" color="var(--color-primary)" />
                </div>
                <h3 className="font-bold text-neutral-800">{title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Insurance companies */}
          <h2 className="text-2xl font-bold text-neutral-800 mb-2 text-center">Private Insurance Partners</h2>
          <div className="divider-accent mx-auto mb-8"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 stagger-children mb-16">
            {companies.map((company) => (
              <a key={company.id} href={company.docLink} target="_blank" rel="noopener noreferrer"
                 className="card p-5 flex flex-col items-center gap-3 group hover:border-cyan-200
                            border border-transparent transition-all"
                 aria-label={`${company.name} — view documents`}>
                <div className="relative w-full h-16">
                  <Image src={company.imageUrl} alt={company.name} fill
                    className="object-contain transition-opacity group-hover:opacity-80" sizes="(max-width: 640px) 50vw, 25vw" />
                </div>
                <p className="text-xs font-medium text-neutral-600 text-center">{company.name}</p>
                <span className="flex items-center gap-1 font-semibold" style={{ fontSize: "0.6rem", color: "var(--color-primary)" }}>
                  View Docs <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>

          {/* Government Schemes */}
          <h2 className="text-2xl font-bold text-neutral-800 mb-2 text-center">
            Government Health Schemes
          </h2>
          <div className="divider-accent mx-auto mb-3"></div>
          <p className="text-center text-neutral-500 text-sm mb-8 max-w-2xl mx-auto">
            We are proudly empanelled with the following central and state government health schemes,
            ensuring affordable and accessible care for all eligible patients.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12 stagger-children">
            {aboutData.governmentSchemes.map((scheme, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl"
                   style={{ background: "var(--color-primary-pale)", border: "1px solid #bae6fd" }}>
                <CheckCircle2 className="w-4 h-4 shrink-0" color="var(--color-accent)" />
                <span className="text-sm font-medium text-neutral-700">{scheme}</span>
              </div>
            ))}
          </div>

          {/* Tariff */}
          <div className="rounded-2xl p-8 text-center" style={{ background: "var(--color-primary-pale)" }}>
            <h3 className="text-xl font-bold text-neutral-800 mb-2">Hospital Charges / Tariff</h3>
            <p className="text-neutral-500 mb-5 max-w-md mx-auto">
              Download our official tariff sheet to understand the estimated costs for various procedures and services.
            </p>
            <a href="https://drive.google.com/file/d/1gSUJYhNeN7v6-uOkmAAZN5aL_Uak-Vuu/view?usp=sharing"
               target="_blank" rel="noopener noreferrer" className="btn-gradient inline-flex">
              <FileText className="w-4 h-4" /> Download Tariff Sheet
            </a>
          </div>

          <div className="mt-8 text-center">
            <p className="text-neutral-500 text-sm mb-3">For billing and insurance queries, contact our helpdesk:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+911234567890" className="btn-outline text-sm py-2 px-4">Call Helpdesk</a>
              <Link href="/contact" className="btn-gradient text-sm py-2 px-4">
                Send Enquiry <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
