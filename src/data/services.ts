import type { InfoSection, OpdSection, JobOpening } from "@/types";

export const ipdData: InfoSection[] = [
  {
    title: "Pre Admission",
    description: [
      "Before admission, our hospital ensures that patients and their families are fully informed and supported. The pre-admission process involves confirming the diagnosis, completing initial paperwork, and understanding the estimated costs and treatment plan.",
      "We assist patients with insurance, TPA, and government scheme documentation (PMJAY, MJPJAY, ESIC, CGHS, ECHS, etc.) at this stage to make the admission process as smooth as possible.",
    ],
    image: "/images/ipd/pre_admission.png",
  },
  {
    title: "Room Types & Facilities",
    description: [
      "The hospital offers a variety of room types to suit different needs and budgets — General Ward, Semi-Private, Private, and Deluxe rooms. Each room is designed to provide a safe, hygienic, and comfortable environment for recovery.",
      "For critically ill patients, we have 150+ ICU beds, 28-bed NICU, and 20-bed PICU — all equipped with advanced monitoring and ventilation support.",
    ],
    image: "/images/ipd/room_types_and_facilities.png",
  },
  {
    title: "At Admission",
    description: [
      "On the day of admission, patients are requested to report to the admission desk with ID proof, doctor's admission note, insurance/TPA card or government scheme card, and previous medical records.",
      "Our team ensures a swift, stress-free admission so patients can be shifted to their rooms and receive medical attention without delays.",
    ],
    image: "/images/ipd/at_admission.png",
  },
  {
    title: "During Stay",
    description: [
      "During the hospital stay, our medical and nursing teams provide round-the-clock care. Doctors make daily rounds, and progress is continuously monitored with adjustments to treatment as needed.",
      "Support services such as the Central Clinical Laboratory (CCL — 24/7), Advanced Radiology (MRI, CT, Ultrasound), Physiotherapy, Dietary consultation, and Pharmacy are integrated into the in-patient care pathway.",
    ],
    image: "/images/ipd/during_stay.png",
  },
  {
    title: "Visitor's Policy",
    description: [
      "General visiting hours are 8:00 AM – 8:00 PM daily. ICU visits are restricted to 10:00 AM – 11:00 AM and 5:00 PM – 6:00 PM to allow adequate rest and uninterrupted medical care.",
      "Only one attendant per patient is permitted. Children under 12 are not allowed in ICU areas. Infection-control guidelines must be followed at all times.",
    ],
    image: "/images/ipd/visitors_policies.png",
  },
  {
    title: "Discharge",
    description: [
      "Discharge is initiated once the treating doctor confirms the patient is medically fit. Our billing team prepares the final statement and coordinates with insurance, TPA, or government scheme offices as applicable.",
      "Patients receive a discharge summary, prescriptions, and follow-up instructions. Day Care patients are typically discharged the same day following observation.",
    ],
    image: "/images/ipd/discharge.png",
  },
  {
    title: "Information Sheets",
    description: [
      "The hospital provides information sheets covering hospital rules, visitor's policy, patient rights and responsibilities, available services, and details of government health schemes.",
      "These sheets are available in Marathi, Hindi, and English for the convenience of patients and families from all communities.",
    ],
    image: "/images/ipd/information_sheet.png",
  },
];

export const opdData: OpdSection[] = [
  {
    section: "Appointment Booking & Registration",
    description:
      "At SVKM's TMPM Hospital, we make your healthcare journey smooth and efficient. Book appointments via our helpline, online portal, or directly at the OPD registration desk. Your details are recorded securely so doctors have complete information at consultation.",
    image: "/images/general_medicine_overview.png",
  },
  {
    section: "Payment Options",
    description:
      "We accept cash, debit/credit cards, UPI, and net banking. For patients covered under PMJAY, MJPJAY, ESIC, CGHS, ECHS, and other government schemes, cashless and subsidised treatment is available. Private insurance cashless facilities are also offered through our empanelled TPA partners.",
    image: "/images/general_medicine_technology_procedure.png",
  },
  {
    section: "OPD Consultation Schedule",
    schedule: [
      { department: "General Medicine / Internal Medicine", doctor: "Consultant Physician", days: "Mon – Sat", timings: "9:00 AM – 1:00 PM", room: "101" },
      { department: "Cardiology", doctor: "Consultant Cardiologist", days: "Mon – Sat", timings: "10:00 AM – 1:00 PM", room: "102" },
      { department: "Obstetrics & Gynaecology", doctor: "Dr. Shakuntala Chhabra", days: "Mon – Sat", timings: "9:30 AM – 12:30 PM", room: "103" },
      { department: "Paediatrics & Neonatology", doctor: "Consultant Paediatrician", days: "Mon – Sat", timings: "10:00 AM – 1:00 PM", room: "104" },
      { department: "Orthopaedics & Trauma", doctor: "Consultant Orthopaedic", days: "Mon – Sat", timings: "11:00 AM – 2:00 PM", room: "105" },
      { department: "General Surgery", doctor: "Consultant Surgeon", days: "Mon – Sat", timings: "10:00 AM – 1:00 PM", room: "106" },
      { department: "ENT", doctor: "Consultant ENT Surgeon", days: "Mon, Wed, Fri", timings: "10:30 AM – 1:30 PM", room: "107" },
      { department: "Ophthalmology", doctor: "Consultant Ophthalmologist", days: "Tue, Thu, Sat", timings: "10:00 AM – 1:00 PM", room: "108" },
      { department: "Dermatology", doctor: "Consultant Dermatologist", days: "Mon, Wed, Fri", timings: "3:00 PM – 6:00 PM", room: "109" },
      { department: "Psychiatry", doctor: "Consultant Psychiatrist", days: "Mon – Sat", timings: "11:00 AM – 1:00 PM", room: "110" },
      { department: "Pulmonology", doctor: "Consultant Pulmonologist", days: "Tue, Thu, Sat", timings: "11:00 AM – 2:00 PM", room: "111" },
      { department: "Oncology (Medical)", doctor: "Consultant Oncologist", days: "Mon – Sat", timings: "10:00 AM – 1:00 PM", room: "112" },
      { department: "Neurosciences (Neurology)", doctor: "Consultant Neurologist", days: "Mon, Wed, Fri", timings: "11:00 AM – 2:00 PM", room: "113" },
      { department: "Nephrology", doctor: "Consultant Nephrologist", days: "Tue, Thu, Sat", timings: "10:00 AM – 1:00 PM", room: "114" },
      { department: "Urology", doctor: "Consultant Urologist", days: "Mon, Wed, Fri", timings: "11:00 AM – 2:00 PM", room: "115" },
      { department: "Gastroenterology", doctor: "Consultant Gastroenterologist", days: "Tue, Thu, Sat", timings: "10:00 AM – 1:00 PM", room: "116" },
      { department: "Dental", doctor: "Consultant Dentist", days: "Mon – Sat", timings: "9:00 AM – 5:00 PM", room: "117" },
    ],
  },
];

export const dayCareData: InfoSection[] = [
  {
    title: "Overview",
    description: [
      "SVKM's TMPM Hospital's Day Care services are designed for patients who require medical treatment, minor surgical procedures, or therapies that do not require an overnight stay.",
      "Day Care is a convenient and cost-effective option that delivers hospital-grade clinical supervision with the comfort of same-day discharge.",
    ],
    image: "/images/day-care/overview.png",
  },
  {
    title: "Benefits of Day Care",
    description: [
      "Day Care services offer same-day discharge, reduced cost of treatment, and the ability to recover in the comfort of your own home.",
      "Shorter waiting times, quicker recovery, personalised supervision, and access to our full diagnostic and pharmacy services make the Day Care experience efficient and reassuring.",
    ],
    image: "/images/day-care/Benefits_of_Day_Care.png",
  },
  {
    title: "Common Day Care Procedures",
    description: [
      "Our hospital offers a wide range of Day Care treatments including chemotherapy sessions (16-bed dedicated unit), haemodialysis (18-bed unit under PMNDP), endoscopy, colonoscopy, minor surgeries (biopsies, cyst removals), IV therapies, and blood transfusions.",
      "Eye surgeries (cataract — phacoemulsification), minor ENT procedures, and certain orthopaedic procedures are also performed as Day Care cases.",
    ],
    image: "/images/day-care/Common_Day_Care_Procedures.png",
  },
  {
    title: "Admission & Process",
    description: [
      "Patients scheduled for Day Care are requested to report to the Day Care reception with their prescriptions, medical history, and relevant documents (including insurance/government scheme card if applicable).",
      "After treatment, patients are observed for a short period to ensure stability before discharge.",
    ],
    image: "/images/day-care/pre_admission.png",
  },
  {
    title: "Facilities Available",
    description: [
      "The Day Care unit provides comfortable beds and recliners, experienced medical and nursing team, easy access to our Central Clinical Laboratory (CCL — 24/7), Advanced Radiology, and in-house Pharmacy.",
      "A dedicated waiting lounge with assistance for insurance, TPA, and government scheme formalities is available for accompanying family members.",
    ],
    image: "/images/day-care/room_types_and_facilities.png",
  },
  {
    title: "Discharge & Follow-up",
    description: [
      "Once the procedure is complete and the doctor confirms patient stability, discharge is initiated. Patients receive discharge summary, medications, and post-treatment care instructions.",
      "Follow-up appointments are scheduled immediately to ensure continuity of care. Patients requiring repeated sessions (e.g. chemotherapy, dialysis) receive a structured appointment plan.",
    ],
    image: "/images/day-care/discharge.png",
  },
];

export const jobOpenings: JobOpening[] = [
  {
    id: 1,
    designation: "ASSISTANT MANAGER / EXECUTIVE — QUALITY",
    numberOfPost: 1,
    educationQualification: [
      "MSc Biotechnology / Biochemistry / Microbiology / Molecular Biology",
      "BSc Biotechnology / Biochemistry / Microbiology / Molecular Biology",
    ],
    yearsOfExperience: [
      { year: 5, description: "Min 5 years of experience working in different departments of Pathology Lab." },
      { year: 8, description: "Min 8 years of experience working in different departments of Pathology Lab." },
    ],
    applicationStartDate: "28 April, 2025",
    applicationEndDate: "08 May, 2025",
    department: "Quality",
    location: "Shirpur",
  },
  {
    id: 2,
    designation: "Senior Technician — Biochemistry",
    numberOfPost: 1,
    educationQualification: [
      "MSc Biotechnology / Biochemistry / Microbiology / Molecular Biology / Histopathology",
      "BSc Biotechnology / Biochemistry / Microbiology / Molecular Biology / Histopathology, DMLT",
    ],
    yearsOfExperience: [
      { year: 2, description: "2 years of experience working in relevant department of Pathology Lab." },
      { year: 4, description: "Min 4 years of experience working in relevant department of Pathology Lab." },
    ],
    applicationStartDate: "28 April, 2025",
    applicationEndDate: "08 May, 2025",
    department: "Pathology",
    location: "Shirpur",
  },
  {
    id: 3,
    designation: "Senior Technician — Haematology & Clinical Pathology",
    numberOfPost: 3,
    educationQualification: [
      "MSc Biotechnology / Biochemistry / Microbiology / Molecular Biology / Histopathology",
      "BSc / DMLT",
    ],
    yearsOfExperience: [
      { year: 2, description: "2 years of experience working in relevant department of Pathology Lab." },
      { year: 4, description: "Min 4 years of experience working in relevant department of Pathology Lab." },
    ],
    applicationStartDate: "28 April, 2025",
    applicationEndDate: "08 May, 2025",
    department: "Pathology",
    location: "Shirpur",
  },
  {
    id: 4,
    designation: "Staff Nurse",
    numberOfPost: 10,
    educationQualification: [
      "B.Sc Nursing / GNM with valid nursing registration",
    ],
    yearsOfExperience: [
      { year: 1, description: "Minimum 1 year of clinical nursing experience preferred." },
    ],
    applicationStartDate: "01 May, 2025",
    applicationEndDate: "20 May, 2025",
    department: "Nursing",
    location: "Shirpur",
  },
  {
    id: 5,
    designation: "Medical Officer",
    numberOfPost: 4,
    educationQualification: [
      "MBBS from a recognised university with valid NMC registration",
    ],
    yearsOfExperience: [
      { year: 1, description: "Minimum 1 year post-internship experience preferred." },
    ],
    applicationStartDate: "01 May, 2025",
    applicationEndDate: "25 May, 2025",
    department: "General Medicine",
    location: "Shirpur",
  },
];
