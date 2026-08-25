// OPD timings per doctor/consultant, shown in the "OPD Schedule" card on each
// doctor's individual profile page. Edit freely — add/remove days, change hours,
// or set a day's hours to "Closed". These are separate from department-level
// timings (see opdTimings.ts) since a consultant's actual clinic hours often
// differ from the department's general OPD hours.
//
// Key = the doctor's exact display name (must match the name shown on the
// site verbatim, including "Dr." and spacing/punctuation).
//
// Why name instead of id: the doctors listing page (/doctors) is CMS-driven,
// and CMS doctor records use long opaque ids (e.g. "fhse7cmmzl9aj8omvs5er5h5")
// that don't match the simple numeric ids in src/data/doctors.ts. Name is the
// one thing that's consistent and predictable across both sources, so it's
// the reliable key here.
//
// A doctor not listed here falls back to `defaultConsultantOpdTimings` below.

export interface OpdDayTiming {
  day: string;
  hours: string; // e.g. "09:00 AM – 05:00 PM", or "Closed"
}

export type OpdSchedule = OpdDayTiming[];

export const defaultConsultantOpdTimings: OpdSchedule = [
  { day: "Monday", hours: "09:00 AM – 05:00 PM" },
  { day: "Tuesday", hours: "09:00 AM – 05:00 PM" },
  { day: "Wednesday", hours: "09:00 AM – 05:00 PM" },
  { day: "Thursday", hours: "09:00 AM – 05:00 PM" },
  { day: "Friday", hours: "09:00 AM – 05:00 PM" },
  { day: "Saturday", hours: "09:00 AM – 05:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export const consultantOpdTimings: Record<string, OpdSchedule> = {
  "Dr. Darshana Pawara": [...defaultConsultantOpdTimings],
  // EXAMPLE of a fully custom schedule (alternate-day clinic, morning-only
  // Saturday) — comment this out and use `[...defaultConsultantOpdTimings]`
  // like the others once you understand the pattern.
  "Dr. Shivram Pawara": [
    { day: "Monday", hours: "11:00 AM – 2:00 PM" },
    { day: "Tuesday", hours: "Closed" },
    { day: "Wednesday", hours: "11:00 AM – 2:00 PM" },
    { day: "Thursday", hours: "Closed" },
    { day: "Friday", hours: "11:00 AM – 2:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 12:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
  "Dr. Vaishnavi Zile": [...defaultConsultantOpdTimings],
  "Dr. Dhiraj Rane": [...defaultConsultantOpdTimings],
  "Dr. Sagar Patil": [...defaultConsultantOpdTimings],
  "Dr. Girish Vadgaonkar": [...defaultConsultantOpdTimings],
  "Dr. Bhagyesh Wankhede": [...defaultConsultantOpdTimings],
  "Dr. Ashwin Baviskar": [...defaultConsultantOpdTimings],
  "Dr. Girish Choudhary": [...defaultConsultantOpdTimings],
  "Dr. Darshan Rakhecha": [...defaultConsultantOpdTimings],
  "Dr. Manasi Sonar": [...defaultConsultantOpdTimings],
  "Dr. Naina Patil": [...defaultConsultantOpdTimings],
  "Dr. Prashant Khairnar": [...defaultConsultantOpdTimings],
  "Dr. Sagar More": [...defaultConsultantOpdTimings],
  "Dr. Sandeep Oswal": [...defaultConsultantOpdTimings],
  "Dr. Subham Patil": [...defaultConsultantOpdTimings],
};
