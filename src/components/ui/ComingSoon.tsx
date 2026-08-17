import Link from "next/link";
import { Construction, Clock, ArrowLeft, Phone, Mail } from "lucide-react";

interface ComingSoonProps {
  title: string;
  estimatedLaunch?: string;
  message?: string;
  showBackButton?: boolean;
}

export default function ComingSoon({
  title,
  estimatedLaunch,
  message,
  showBackButton = true,
}: ComingSoonProps) {
  return (
    <section className="section-padding min-h-[60vh] flex items-center">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-6">
            <Construction className="w-10 h-10 text-amber-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4 font-serif">
            {title}
          </h1>

          <p className="text-lg text-neutral-600 mb-3">
            {message || `We are working on bringing world-class ${title.toLowerCase()} to Shirpur.`}
          </p>

          {estimatedLaunch && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 text-sm font-medium mb-8">
              <Clock className="w-4 h-4" />
              {/* Estimated launch: {estimatedLaunch} */}
              Coming Soon
            </div>
          )}

          <div className="bg-neutral-50 rounded-2xl p-6 md:p-8 mt-8 text-left">
            <h3 className="font-semibold text-neutral-800 mb-3 text-center">
              Need assistance? Reach us directly
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:+912563351503"
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200 hover:border-cyan-200 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-cyan-700" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Appointment</p>
                  <p className="text-sm font-semibold text-neutral-800">02563 351503/04</p>
                </div>
              </a>
              <a
                href="mailto:contact.tmpmh@svkm.ac.in"
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200 hover:border-cyan-200 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-cyan-700" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Email</p>
                  <p className="text-sm font-semibold text-neutral-800">contact.tmpmh@svkm.ac.in</p>
                </div>
              </a>
            </div>
          </div>

          {showBackButton && (
            <Link
              href="/departments"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-cyan-700 hover:text-cyan-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Departments
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
