# OPD Timings — How to Use

Two separate files control OPD hours shown on the site. This doc covers both:
what each one is for, exactly what to edit, and how the data actually reaches
the page.

| File | Controls | Shown on |
|---|---|---|
| `src/data/opdTimings.ts` | Timings for a **department** | Each department's detail page (`/departments/<slug>`), sidebar "OPD Timings" card |
| `src/data/consultants/<doctor-file>.ts` (each doctor's own `bio_data.opdTiming`) | Timings for a **doctor** | Each doctor's profile page (`/doctors/<id>`), sidebar "OPD Schedule" card |

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

## 2. Doctor timings — each doctor's own file in `src/data/consultants/`

### What it looks like

Every doctor is one file in `src/data/consultants/` (e.g.
`prashant-khairnar.ts`), listed in `src/data/consultants/index.ts`. Their OPD
hours live right on that doctor's own record, as `bio_data.opdTiming` — a
day-keyed object, not an array:

```ts
// src/data/consultants/shivram-pawara.ts
const doctor: Doctor = {
  id: 2,
  name: "Dr. Shivram Gopal Pawara",
  ...
  bio_data: {
    opdTiming: {
      monday: "11:00 AM – 2:00 PM",
      tuesday: "Closed",
      wednesday: "11:00 AM – 2:00 PM",
      thursday: "Closed",
      friday: "11:00 AM – 2:00 PM",
      saturday: "10:00 AM – 12:00 PM",
      sunday: "Closed",
    },
    ...
  },
};
```

Most doctors use the standard Mon–Sat 9 AM–5 PM / Sunday-closed schedule, so
their file just spreads the shared default instead of retyping it:

```ts
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";
...
opdTiming: { ...DEFAULT_OPD_TIMING },
```

### There's no separate "key" to match anymore

Unlike the department file, there's nothing to look up by id or name — you
just open that doctor's own file and edit their `opdTiming` object directly.
**If you ever add a new doctor**, copy an existing file as a template (see
`src/data/consultants/index.ts` for the full add-a-doctor steps) and either
spread `DEFAULT_OPD_TIMING` or write your own hours, same as above.

### What to actually edit

Any of the seven keys (`monday` … `sunday`) can be set to a time range or the
exact word `"Closed"`. A day left out entirely just displays as "Closed" on
the profile page (see §3) — so for a doctor who only clinics 3 days/week, you
only need to write the days that aren't closed:

```ts
opdTiming: {
  monday: "9:00 AM – 12:00 PM",
  wednesday: "9:00 AM – 12:00 PM",
  friday: "9:00 AM – 12:00 PM",
}, // Dr. Sagar Patil — clinic only 3 days/week
```

### The example entry (currently in the codebase)

`src/data/consultants/shivram-pawara.ts` has a real alternate-day schedule
you can use as a reference for the custom-hours pattern — every other doctor
file currently just spreads `DEFAULT_OPD_TIMING`.

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
const schedule = buildOpdSchedule(doctor.bio_data.opdTiming);
```
`buildOpdSchedule` walks the fixed Monday→Sunday order and reads each day
straight off the doctor's own `bio_data.opdTiming`, defaulting any day that
isn't set to `"Closed"`. Mapped into the same "OPD Schedule" sidebar card as
before.

For departments: if the slug has an entry in `opdTimings.ts`, that exact
array is shown, otherwise the default schedule is shown instead — no
merging/partial-override behavior there. Doctors work a little differently
now that hours live on the doctor record itself: each day is read
independently, so a doctor's `opdTiming` can freely mix explicit days with
omitted ones (which just show "Closed").

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

**Department:**
- [ ] Open `opdTimings.ts`, find the entry by **slug**
- [ ] Replace `[...defaultOpdTimings]` with a real array of `{ day, hours }` pairs
- [ ] Use the exact word `"Closed"` for closed days if you want it to show in red
- [ ] Save — no other file needs touching
- [ ] If nothing shows up, check it isn't marked inactive in `pageStatus.ts`

**Doctor:**
- [ ] Open that doctor's file in `src/data/consultants/`
- [ ] Edit their `bio_data.opdTiming` object directly (or spread
      `DEFAULT_OPD_TIMING` for the standard Mon–Sat 9–5 schedule)
- [ ] Use the exact word `"Closed"` for closed days if you want it to show in red;
      an omitted day also shows as "Closed"
- [ ] Save — no other file needs touching
