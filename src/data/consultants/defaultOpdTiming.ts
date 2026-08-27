import type { OpdTiming } from "@/types";

// Shared by any consultant file whose clinic hours are the standard
// Mon–Sat 9 AM–5 PM / Sunday closed schedule — spread it into a doctor's
// bio_data.opdTiming rather than retyping the same seven lines per file.
// A doctor with different hours (see shivram-pawara.ts) just writes their
// own opdTiming object instead of using this.
export const DEFAULT_OPD_TIMING: OpdTiming = {
  monday: "09:00 AM – 05:00 PM",
  tuesday: "09:00 AM – 05:00 PM",
  wednesday: "09:00 AM – 05:00 PM",
  thursday: "09:00 AM – 05:00 PM",
  friday: "09:00 AM – 05:00 PM",
  saturday: "09:00 AM – 05:00 PM",
  sunday: "Closed",
};
