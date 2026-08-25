// OPD timings per department, shown in the "OPD Timings" card on each department's page.
// Edit freely — add/remove days, change hours, or set a day's hours to "Closed".
// Key = department slug (must match the `slug` field in src/data/departments.ts).
// A department not listed here falls back to `defaultOpdTimings` below.

export interface OpdDayTiming {
  day: string;
  hours: string; // e.g. "09:00 AM – 05:00 PM", or "Closed"
}

export type OpdSchedule = OpdDayTiming[];

export const defaultOpdTimings: OpdSchedule = [
  { day: "Monday", hours: "9:00 AM – 5:00 PM" },
  { day: "Tuesday", hours: "09:00 AM – 05:00 PM" },
  { day: "Wednesday", hours: "09:00 AM – 05:00 PM" },
  { day: "Thursday", hours: "09:00 AM – 05:00 PM" },
  { day: "Friday", hours: "09:00 AM – 05:00 PM" },
  { day: "Saturday", hours: "09:00 AM – 05:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export const opdTimings: Record<string, OpdSchedule> = {
  "emergency-care": [
    { day: "Monday", hours: "Open 24 hours" },
    { day: "Tuesday", hours: "Open 24 hours" },
    { day: "Wednesday", hours: "Open 24 hours" },
    { day: "Thursday", hours: "Open 24 hours" },
    { day: "Friday", hours: "Open 24 hours" },
    { day: "Saturday", hours: "Open 24 hours" },
    { day: "Sunday", hours: "Open 24 hours" },
  ],
  "general-medicine": [...defaultOpdTimings],
  // EXAMPLE of a fully custom schedule (different hours per day, closed mid-week
  // instead of Sunday) — comment this out and use `[...defaultOpdTimings]` like
  // the others once you understand the pattern.
  "cardiology": [
    { day: "Monday", hours: "9:00 AM – 1:00 PM" },
    { day: "Tuesday", hours: "9:00 AM – 1:00 PM" },
    { day: "Wednesday", hours: "Closed" },
    { day: "Thursday", hours: "9:00 AM – 1:00 PM" },
    { day: "Friday", hours: "9:00 AM – 1:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 12:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
  "obstetrics-gynecology": [...defaultOpdTimings],
  "pediatrics": [...defaultOpdTimings],
  "general-surgery": [...defaultOpdTimings],
  "orthopedics": [...defaultOpdTimings],
  "ent": [...defaultOpdTimings],
  "dental": [...defaultOpdTimings],
  "ophthalmology": [...defaultOpdTimings],
  "dermatology": [...defaultOpdTimings],
  "psychiatry": [...defaultOpdTimings],
  "pulmonology": [...defaultOpdTimings],
  "laser-surgery": [...defaultOpdTimings],
  "oncology": [...defaultOpdTimings],
  "cardiac-sciences": [...defaultOpdTimings],
  "neurosciences": [...defaultOpdTimings],
  "nephrology": [...defaultOpdTimings],
  "gastroenterology": [...defaultOpdTimings],
  "plastic-surgery": [...defaultOpdTimings],
  "vascular-surgery": [...defaultOpdTimings],
  "pediatric-surgery": [...defaultOpdTimings],
  "laparoscopic-surgery": [...defaultOpdTimings],
  "urology": [...defaultOpdTimings],
  "arthroscopy": [...defaultOpdTimings],
  "joint-replacement": [...defaultOpdTimings],
  "radiology": [...defaultOpdTimings],
  "pathology-lab": [
    { day: "Monday", hours: "Open 24 hours" },
    { day: "Tuesday", hours: "Open 24 hours" },
    { day: "Wednesday", hours: "Open 24 hours" },
    { day: "Thursday", hours: "Open 24 hours" },
    { day: "Friday", hours: "Open 24 hours" },
    { day: "Saturday", hours: "Open 24 hours" },
    { day: "Sunday", hours: "Open 24 hours" },
  ],
  "physiotherapy": [...defaultOpdTimings],
  "anaesthesiology": [...defaultOpdTimings],
  "dialysis": [...defaultOpdTimings],
  "blood-bank": [
    { day: "Monday", hours: "Open 24 hours" },
    { day: "Tuesday", hours: "Open 24 hours" },
    { day: "Wednesday", hours: "Open 24 hours" },
    { day: "Thursday", hours: "Open 24 hours" },
    { day: "Friday", hours: "Open 24 hours" },
    { day: "Saturday", hours: "Open 24 hours" },
    { day: "Sunday", hours: "Open 24 hours" },
  ],
};
