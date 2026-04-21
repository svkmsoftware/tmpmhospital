"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  message: string;
}

const departments = [
  "General Medicine",
  "General Surgery",
  "Obstetrics & Gynaecology",
  "Paediatrics",
  "Orthopaedics",
  "Anaesthesiology",
  "Ophthalmology",
  "Dermatology",
  "ENT",
  "Other",
];

const subjects = [
  "Appointment Booking",
  "Medical Enquiry",
  "Billing & Insurance",
  "Feedback",
  "Careers",
  "Other",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", subject: "", department: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email is required.";
    if (form.phone && !/^[0-9+\-\s()]{7,15}$/.test(form.phone))
      e.phone = "Enter a valid phone number.";
    if (!form.subject) e.subject = "Please select a subject.";
    if (!form.message.trim() || form.message.length < 10)
      e.message = "Message must be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulated API call — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const field = (key: keyof FormState) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
    className: cn("input-field", errors[key] && "border-red-400 focus:ring-red-400"),
  });

  if (submitted) {
    return (
      <div className="card p-10 flex flex-col items-center justify-center text-center min-h-[400px] gap-4">
        <CheckCircle className="w-16 h-16 text-emerald-500" />
        <h3 className="text-2xl font-bold text-neutral-800">Message Sent!</h3>
        <p className="text-neutral-500 max-w-sm">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", department: "", message: "" }); }}
          className="btn-outline mt-2"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6 md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 mb-6">Send Us a Message</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input id="name" type="text" placeholder="Your full name" {...field("name")} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input id="email" type="email" placeholder="you@example.com" {...field("email")} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Phone Number
            </label>
            <input id="phone" type="tel" placeholder="+91 98765 43210" {...field("phone")} />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Subject <span className="text-red-500">*</span>
            </label>
            <select id="subject" {...field("subject")}>
              <option value="">Select subject…</option>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Department (Optional)
          </label>
          <select id="department" {...field("department")}>
            <option value="">Select department…</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Describe your enquiry or appointment details…"
            {...field("message")}
            className={cn("input-field resize-none", errors.message && "border-red-400")}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          <p className="text-xs text-neutral-400 mt-1">{form.message.length} / 1000 characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={cn("btn-primary w-full justify-center", loading && "opacity-70 cursor-not-allowed")}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending…
            </span>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send Message
            </>
          )}
        </button>

        <p className="text-xs text-neutral-400 text-center">
          Your information is secure and will never be shared with third parties.
        </p>
      </form>
    </div>
  );
}
