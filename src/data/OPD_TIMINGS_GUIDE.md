# OPD Timings — How to Use

Two separate files control OPD hours shown on the site. This doc covers both:
what each one is for, exactly what to edit, and how the data actually reaches
the page.

| File | Controls | Shown on |
|---|---|---|
| `src/data/opdTimings.ts` | Timings for a **department** | Each department's detail page (`/departments/<slug>`), sidebar "OPD Timings" card |
| `src/data/consultantOpdTimings.ts` | Timings for a **doctor** | Each doctor's profile page (`/doctors/<id>`), sidebar "OPD Schedule" card |

They're intentionally separate — a doctor's actual clinic hours are often
narrower than their department's general OPD hours (e.g. the Cardiology
department may be open 9–5, but Dr. X only sees patients Mon/Wed/Fri
mornings). Editing one never affects the other.

---

## 1. Department timings — `opdTimings.ts`

### What it looks like

```ts
export const opdTimings: Record<string, OpdSchedule> = {
  "cardiology": [
    { day: "Monday", hours: "9:00 AM – 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM – 5:00 PM" },
    { day: "Wednesday", hours: "Closed" },
    ...
    { day: "Sunday", hours: "Closed" },
  ],
  "dental": [...defaultOpdTimings],
  ...
};
```

### The key: department **slug**

Each entry's key must exactly match a department's `slug` field in
`src/data/departments.ts`. Slugs currently in use:

```
emergency-care, general-medicine, cardiology, obstetrics-gynecology,
pediatrics, general-surgery, orthopedics, ent, dental, ophthalmology,
dermatology, psychiatry, pulmonology, laser-surgery, oncology,
cardiac-sciences, neurosciences, nephrology, gastroenterology,
plastic-surgery, vascular-surgery, pediatric-surgery, laparoscopic-surgery,
urology, arthroscopy, joint-replacement, radiology, pathology-lab,
physiotherapy, anaesthesiology, dialysis, blood-bank
```

If you ever add a brand-new department in `departments.ts`, its `slug` is
what you'd use as the key here. If you don't add an entry for a slug, that
department just uses `defaultOpdTimings` automatically — nothing breaks.

### What to actually edit

For any department, replace `[...defaultOpdTimings]` with a real array of
`{ day, hours }` pairs — one entry per day you want to show:

```ts
"dental": [
  { day: "Monday", hours: "10:00 AM – 6:00 PM" },
  { day: "Tuesday", hours: "10:00 AM – 6:00 PM" },
  { day: "Wednesday", hours: "10:00 AM – 6:00 PM" },
  { day: "Thursday", hours: "10:00 AM – 6:00 PM" },
  { day: "Friday", hours: "10:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
],
```

Rules:
- `day` — any label you want (`"Monday"`, `"Mon"`, `"Weekdays"` — it's just
  displayed as-is, nothing parses it).
- `hours` — any text. The one special value is the exact word **`"Closed"`**
  — that renders in red. Everything else (a time range, `"Open 24 hours"`,
  `"By appointment"`, etc.) renders in normal gray.
- You can list as many or as few days as you want. Only what's in the array
  shows up — there's no hidden "fill in the rest with defaults" behavior once
  you've written a custom array for that department.
- Order matters for display — the card shows rows top-to-bottom in the order
  you write them.

### Already-set special cases

- **`emergency-care`** and **`pathology-lab`** and **`blood-bank`** are
  pre-filled with "Open 24 hours" every day, matching their real 24/7
  descriptions. Adjust if that's ever not accurate.
- **`emergency-care` doesn't actually use this data on screen** — the
  department page has a hardcoded special case (`isEmergencyDept` in
  `[slug]/page.tsx`) that always shows "All Days — 24/7 Available" instead of
  a day-by-day table. The `opdTimings.ts` entry for it is there for
  consistency/future use but isn't currently rendered.

### The example entry (currently in the file)

`"cardiology"` right now has a fully spelled-out **example** schedule (closed
Wednesday instead of Sunday, shorter hours) so you can see the pattern in
practice. Once you're comfortable with it, either replace it with
Cardiology's real hours, or revert it to `[...defaultOpdTimings]` like the
other untouched departments.

---

## 2. Doctor timings — `consultantOpdTimings.ts`

### What it looks like

```ts
export const consultantOpdTimings: Record<number, OpdSchedule> = {
  1: [...defaultConsultantOpdTimings], // Dr. Darshana Pawara
  2: [
    { day: "Monday", hours: "11:00 AM – 2:00 PM" },
    { day: "Tuesday", hours: "Closed" },
    ...
  ], // Dr. Shivram Pawara
  ...
};
```

### The key: doctor **id** (a number, not a name)

Each entry's key must exactly match a doctor's `id` field in
`src/data/doctors.ts`. Current ids → names:

```
1  Dr. Darshana Pawara        9  Dr. Girish Choudhary
2  Dr. Shivram Pawara         10 Dr. Darshan Rakhecha
3  Dr. Vaishnavi Zile         11 Dr. Manasi Sonar
4  Dr. Dhiraj Rane            12 Dr. Naina Patil
5  Dr. Sagar Patil            13 Dr. Prashant Khairnar
6  Dr. Girish Vadgaonkar      14 Dr. Sagar More
7  Dr. Bhagyesh Wankhede      15 Dr. Sandeep Oswal
8  Dr. Ashwin Baviskar        16 Dr. Subham Patil
```

**If you ever add a new doctor** to `doctors.ts`, give them a unique `id`
(check the list above / the file itself so you don't accidentally reuse one —
two doctors sharing an id used to be a real bug here, since fixed), then add
a matching entry here using that same number as the key. A doctor not listed
here just falls back to `defaultConsultantOpdTimings`.

### What to actually edit

Same shape and same rules as the department file — replace
`[...defaultConsultantOpdTimings]` with real `{ day, hours }` pairs:

```ts
5: [
  { day: "Monday", hours: "9:00 AM – 12:00 PM" },
  { day: "Wednesday", hours: "9:00 AM – 12:00 PM" },
  { day: "Friday", hours: "9:00 AM – 12:00 PM" },
], // Dr. Sagar Patil — clinic only 3 days/week
```

Note this example only lists 3 days on purpose — Tuesday/Thursday/
Saturday/Sunday simply won't appear as rows in that doctor's card at all
(not shown as "Closed", just absent). Either style works; pick whichever you
want, per doctor.

### The example entry (currently in the file)

Doctor `2` (Dr. Shivram Pawara) currently has an **example** alternate-day
schedule for you to study. Same as above — replace with real hours, or revert
to `[...defaultConsultantOpdTimings]` once you're done comparing.

---

## 3. How the data actually reaches the page (for reference)

You don't need this section to make edits — it's here in case something
looks wrong and you want to trace it.

**Department page** — `src/app/(routes)/departments/[slug]/page.tsx`:
```ts
import { opdTimings, defaultOpdTimings } from "@/data/opdTimings";
...
const schedule = opdTimings[dept.slug] ?? defaultOpdTimings;
```
`schedule` is then mapped straight into the "OPD Timings" sidebar card.

**Doctor page** — `src/app/(routes)/doctors/[id]/page.tsx`:
```ts
import { consultantOpdTimings, defaultConsultantOpdTimings } from "@/data/consultantOpdTimings";
...
const schedule = consultantOpdTimings[doctor.id] ?? defaultConsultantOpdTimings;
```
Same idea, mapped into the "OPD Schedule" sidebar card.

In both cases: if the slug/id has an entry in the data file, that exact array
is shown. If not, the default schedule is shown instead. There's no
merging/partial-override behavior — a custom entry fully replaces the
default for that one department or doctor.

---

## 4. Important gotcha: "Coming Soon" departments show no OPD card at all

Some departments are deliberately marked inactive in
`src/data/pageStatus.ts` (e.g. still `cardiology` as of this writing — check
that file for the current list). Those department pages show a "Coming Soon"
placeholder instead of the normal layout, and **the OPD Timings sidebar
doesn't render at all** on that placeholder — so editing `opdTimings.ts` for
an inactive department won't visibly change anything until that department
is switched to active in `pageStatus.ts`.

This doesn't apply to doctors — every doctor's profile page always shows the
"OPD Schedule" card (there's no doctor-level "Coming Soon" state).

---

## Quick checklist for editing

- [ ] Open `opdTimings.ts` (departments) or `consultantOpdTimings.ts` (doctors)
- [ ] Find the entry by **slug** (departments) or **numeric id** (doctors)
- [ ] Replace `[...defaultOpdTimings]` / `[...defaultConsultantOpdTimings]`
      with a real array of `{ day, hours }` pairs
- [ ] Use the exact word `"Closed"` for closed days if you want it to show in red
- [ ] Save — no other file needs touching for a timing-only change
- [ ] If it's a department and nothing shows up, check it isn't marked
      inactive in `pageStatus.ts`
