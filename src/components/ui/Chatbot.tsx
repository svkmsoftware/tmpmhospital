"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Bot, User, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Hospital-specific knowledge base for instant replies (no API call needed)
// ─────────────────────────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  "Book an appointment",
  "OPD timings",
  "Emergency contact",
  "Find a doctor",
  "Insurance & TPA",
  "Hospital location",
];

const FAQ_KB: { patterns: string[]; answer: string }[] = [
  {
    patterns: ["opd", "outpatient", "timing", "time", "hours", "open", "clinic"],
    answer: "🕐 **OPD Timings:**\n• Monday – Saturday: 8:00 AM – 8:00 PM\n• Emergency: 24 × 7\n\nFor specific department timings, please visit our [OPD page](/opd) or call our helpline.",
  },
  {
    patterns: ["appointment", "book", "schedule", "consult", "visit"],
    answer: "📅 **Book an Appointment:**\nYou can book in 3 ways:\n1. Call **+91 12345 67890**\n2. Visit the [Contact page](/contact)\n3. Walk into the OPD registration desk\n\nShall I help with anything else?",
  },
  {
    patterns: ["emergency", "urgent", "accident", "icu", "critical", "ambulance"],
    answer: "🚨 **Emergency Services:**\nOur Emergency Department is open **24 hours, 7 days a week**.\n\n📞 **Emergency Hotline:** +91 12345 67890\n\nWe have 34 emergency beds and dedicated emergency physicians always on duty.",
  },
  {
    patterns: ["doctor", "specialist", "physician", "surgeon", "gynaecologist", "paediatric", "ortho"],
    answer: "👨‍⚕️ **Our Doctors:**\nWe have 50+ specialist doctors across departments including General Medicine, Surgery, Gynaecology, Paediatrics, Orthopaedics, Anaesthesiology, ENT, and more.\n\nVisit our [Doctors page](/doctors) to find the right specialist for you.",
  },
  {
    patterns: ["insurance", "tpa", "cashless", "claim", "corporate"],
    answer: "🛡️ **Insurance & TPA:**\nWe are empanelled with major TPA and insurance providers including:\n• Aditya Birla Capital\n• ICICI Lombard\n• Tata AIG\n• Bajaj Life Insurance\n• Care Health Insurance\n\nFor cashless treatment, present your insurance card at admission.\n\nSee the full [TPA & Insurance list](/tpa-insurance).",
  },
  {
    patterns: ["location", "address", "where", "directions", "map", "reach", "shirpur"],
    answer: "📍 **Hospital Location:**\nSVKM's TMPM Hospital\nKharde, Budruk, Shirpur,\nDhule – 425405, Maharashtra\n\n[Get Directions →](https://maps.google.com/?q=Shirpur+Hospital+Maharashtra)",
  },
  {
    patterns: ["bed", "room", "ward", "admit", "admission", "ipd", "inpatient"],
    answer: "🏥 **IPD & Room Types:**\nWe offer:\n• General Ward\n• Semi-Private Room\n• Private Room\n• Deluxe Room\n• ICU / HDU / NICU / PICU\n\nTotal 1200 beds including 120+ critical care & 34 emergency beds.\n\nLearn more on our [IPD page](/ipd).",
  },
  {
    patterns: ["day care", "daycare", "same day", "minor surgery", "procedure"],
    answer: "🏨 **Day Care Services:**\nOur Day Care unit handles same-day procedures:\n• Minor surgeries\n• Chemotherapy sessions\n• Endoscopy / Colonoscopy\n• IV Therapies & Blood transfusions\n\nPatients are discharged the same day.\n\nLearn more on our [Day Care page](/day-care).",
  },
  {
    patterns: ["fee", "charge", "cost", "tariff", "price", "bill"],
    answer: "💳 **Hospital Charges:**\nWe follow a transparent, affordable pricing model.\n\n📄 [Download Tariff Sheet](https://drive.google.com/file/d/1gSUJYhNeN7v6-uOkmAAZN5aL_Uak-Vuu/view?usp=sharing)\n\nFor billing queries, contact us at **+91 12345 67890**.",
  },
  {
    patterns: ["career", "job", "vacancy", "opening", "hiring", "work"],
    answer: "💼 **Career Opportunities:**\nWe are always looking for passionate healthcare professionals!\n\nVisit our [Careers page](/careers) to see current openings and apply.",
  },
  {
    patterns: ["hello", "hi", "hey", "helo", "namaste", "good morning", "good afternoon", "good evening"],
    answer: "👋 **Hello! Welcome to SVKM's TMPM Hospital.**\n\nI'm your virtual assistant. I can help you with:\n• Appointment booking\n• OPD timings\n• Finding a doctor\n• Insurance & billing\n• Hospital location\n\nWhat can I help you with today?",
  },
  {
    patterns: ["thank", "thanks", "thankyou", "ok", "okay", "great", "perfect"],
    answer: "😊 You're welcome! If you need any more help, feel free to ask.\n\nFor urgent queries, call us at **+91 12345 67890** (available 24 × 7).",
  },
  {
    patterns: ["pharmacy", "medicine", "drug", "chemist"],
    answer: "💊 **In-House Pharmacy:**\nOur pharmacy is located on the hospital premises.\n\n⏰ Timings: 8:00 AM – 10:00 PM\n\nEmergency medicines are available round the clock at the emergency counter.",
  },
  {
    patterns: ["visitor", "visiting", "visit", "attendant", "family"],
    answer: "👥 **Visitor Policy:**\n• General visiting: 8:00 AM – 8:00 PM\n• ICU visits: 10–11 AM & 5–6 PM only\n• Max 1 attendant per patient\n• Children under 12 not allowed in ICU\n\nPlease follow infection-control guidelines during visits.",
  },
  {
    patterns: ["department", "speciality", "specialty", "service"],
    answer: "🏥 **Our Departments:**\nWe offer care across multiple specialties:\n• General Medicine, Surgery\n• Obstetrics & Gynaecology\n• Paediatrics & Neonatology\n• Orthopaedics, Anaesthesiology\n• ENT, Ophthalmology, Dermatology\n\nExplore all on our [Departments page](/departments).",
  },
];

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
  timestamp: Date;
}

// ─── Helper: get bot response ──────────────────────────────────────────────────
function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  for (const faq of FAQ_KB) {
    if (faq.patterns.some((p) => lower.includes(p))) {
      return faq.answer;
    }
  }

  return "I'm not sure about that, but our team is happy to help! 😊\n\n📞 **Call us:** +91 12345 67890\n📧 **Email:** contact@tmpmhospital.com\n\nOr visit our [Contact page](/contact) to send us a message.";
}

// ─── Render markdown-like bot messages ─────────────────────────────────────────
function BotMessage({ content }: { content: string }) {
  const html = content
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="underline text-cyan-200 hover:text-white font-medium" target="_self">$1</a>')
    .replace(/^• (.+)$/gm, '<li class="ml-3 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-3 list-decimal">$2</li>')
    .split("\n")
    .map((line) => `<p class="leading-relaxed">${line || "&nbsp;"}</p>`)
    .join("");

  return <div className="text-sm space-y-1" dangerouslySetInnerHTML={{ __html: html }}></div>;
}

// ─── Main Chatbot Component ────────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: "👋 **Hello! Welcome to SVKM's TMPM Hospital.**\n\nI'm your virtual assistant. I can help you with appointment booking, doctor info, OPD timings, insurance, and more.\n\nHow can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate typing delay (300–900ms based on response length)
    const response = getBotResponse(trimmed);
    const delay = Math.min(300 + response.length * 2, 900);

    await new Promise((r) => setTimeout(r, delay));

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "bot",
      content: response,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMsg]);
    setTyping(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (text: string) => sendMessage(text);

  return (
    <>
      {/* ── Floating button ─────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white shadow-2xl",
          "flex items-center justify-center transition-all duration-300",
          open ? "rotate-0 scale-100" : "animate-chat-bounce"
        )}
        style={{ background: "var(--gradient-main)" }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {/* Pulse ring */}
        {!open && (
          <span
            className="absolute inset-0 rounded-full animate-pulse-ring"
            style={{ background: "var(--color-primary)" }}></span>
        )}
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* ── Chat window ─────────────────────────────────────────────────── */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col",
          "rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right",
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        )}
        style={{ height: "520px", maxHeight: "80vh" }}
        role="dialog"
        aria-label="Chat with TMPM Hospital"
        aria-modal="true"
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-4 text-white shrink-0"
          style={{ background: "var(--gradient-main)" }}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            {/* Online dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-tight">TMPM Hospital Assistant</p>
            <p className="text-xs text-white/70">Online · Usually replies instantly</p>
          </div>
          <a
            href="tel:+911234567890"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            title="Call Emergency"
            aria-label="Emergency call"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
          </a>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Close chat"
          >
            <ChevronDown className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex gap-2 animate-slide-up", msg.role === "user" && "flex-row-reverse")}
            >
              {/* Avatar */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold",
                msg.role === "bot"
                  ? "bg-gradient-main"
                  : "bg-neutral-300"
              )}
              style={msg.role === "bot" ? { background: "var(--gradient-main)" } : undefined}>
                {msg.role === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4 text-neutral-600" />}
              </div>

              {/* Bubble */}
              <div className={cn(
                "max-w-[78%] rounded-2xl px-4 py-3 text-sm",
                msg.role === "bot"
                  ? "bg-white shadow-sm text-neutral-700 rounded-tl-sm"
                  : "text-white rounded-tr-sm"
              )}
              style={msg.role === "user" ? { background: "var(--gradient-main)" } : undefined}>
                {msg.role === "bot"
                  ? <BotMessage content={msg.content} />
                  : <p>{msg.content}</p>
                }
                <p className={cn("text-xs mt-1.5", msg.role === "bot" ? "text-neutral-300" : "text-white/50")}>
                  {msg.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                   style={{ background: "var(--gradient-main)" }}>
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                {[0, 160, 320].map((delay) => (
                  <span key={delay}
                    className="w-2 h-2 rounded-full bg-neutral-300"
                    style={{ animation: `typingDot 1.2s ${delay}ms infinite` }}></span>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Quick replies (show only at start) */}
        {messages.length <= 1 && (
          <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-100 flex gap-2 overflow-x-auto shrink-0"
               style={{ scrollbarWidth: "none" }}>
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border-2 transition-all"
                style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = "var(--color-primary)";
                  (e.target as HTMLButtonElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = "";
                  (e.target as HTMLButtonElement).style.color = "var(--color-primary)";
                }}
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2 p-3 bg-white border-t border-neutral-100 shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm
                       focus:outline-none focus:ring-2 focus:border-transparent transition-all"
            style={{ "--tw-ring-color": "var(--color-primary)" } as React.CSSProperties}
            disabled={typing}
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            className="w-10 h-10 rounded-xl text-white flex items-center justify-center
                       transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "var(--gradient-main)" }}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}
