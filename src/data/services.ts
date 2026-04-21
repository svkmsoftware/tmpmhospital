import type { InfoSection, OpdSection, JobOpening } from "@/types";

export const ipdData: InfoSection[] = [
  {
    title: "Pre Admission",
    description: [
      "Before admission, our hospital ensures that patients and their families are fully informed and supported. The pre-admission process involves confirming the diagnosis, completing initial paperwork, and understanding the estimated costs and treatment plan.",
      "We also assist patients with insurance or TPA documentation at this stage to make the admission process as smooth as possible.",
    ],
    image: "/images/ipd/pre_admission.png",
  },
  {
    title: "Room Types & Facilities",
    description: [
      "The hospital offers a variety of room types to suit different needs and budgets, ranging from general wards to private and deluxe rooms. Each room is designed to provide a safe, hygienic, and comfortable environment for recovery.",
      "For patients seeking additional comfort, we provide semi-private and private rooms equipped with modern amenities. ICU and critical care units are available for patients requiring specialised monitoring.",
    ],
    image: "/images/ipd/room_types_and_facilities.png",
  },
  {
    title: "At Admission",
    description: [
      "On the day of admission, patients or their attendants are requested to report to the admission desk with all necessary documents including ID proof, doctor's admission note, insurance/TPA card, and previous medical records.",
      "The goal is to make the process quick and stress-free so that patients can be shifted to their rooms and receive medical attention without unnecessary delays.",
    ],
    image: "/images/ipd/at_admission.png",
  },
  {
    title: "During Stay",
    description: [
      "During the hospital stay, our medical and nursing teams work together to provide round-the-clock care. Each patient is monitored regularly, and doctors make daily rounds to check progress and adjust treatment.",
      "Support services such as diagnostic tests, dietary consultation, and physiotherapy are also available as part of in-patient care.",
    ],
    image: "/images/ipd/during_stay.png",
  },
  {
    title: "Visitor's Policy",
    description: [
      "We recognize the importance of family and friends in the healing process. Visiting hours are fixed to avoid overcrowding and to ensure patients receive sufficient rest and uninterrupted medical care.",
      "Only a limited number of visitors are allowed at a time, and infection-control guidelines must be followed strictly.",
    ],
    image: "/images/ipd/visitors_policies.png",
  },
  {
    title: "Discharge",
    description: [
      "The discharge process begins once the treating doctor confirms that the patient is medically fit to leave. Our billing team prepares the final statement and insurance/TPA approvals are coordinated.",
      "Patients are given discharge summaries, prescriptions, and follow-up instructions for continued care at home.",
    ],
    image: "/images/ipd/discharge.png",
  },
  {
    title: "Information Sheets",
    description: [
      "For the convenience of patients and families, the hospital provides information sheets covering hospital rules, visitor's policy, available services, and patient rights and responsibilities.",
      "These sheets act as a ready reference guide throughout the hospital stay.",
    ],
    image: "/images/ipd/information_sheet.png",
  },
];

export const opdData: OpdSection[] = [
  {
    section: "Appointment Booking & Registration",
    description:
      "At SVKM's Tapanbhai Mukeshbhai Patel Memorial Hospital, we strive to make your healthcare journey as smooth as possible. You can schedule an appointment through our online booking portal, by calling our helpline, or by visiting the hospital reception directly. During registration, our staff ensures your details are recorded accurately so doctors have complete information when you visit.",
    image: "/images/general_medicine_overview.png",
  },
  {
    section: "Payment Options",
    description:
      "We understand that financial flexibility is as important as medical care. Patients can make payments in cash, use debit or credit cards, or complete transactions through UPI and net banking. For patients covered under insurance or TPA, we provide cashless facilities where treatment charges are directly settled with the insurer.",
    image: "/images/general_medicine_technology_procedure.png",
  },
  {
    section: "OPD Consultation Schedule",
    schedule: [
      { department: "General Medicine", doctor: "Dr. A. Sharma", days: "Monday to Friday", timings: "10:00 AM – 1:00 PM", room: "101" },
      { department: "Paediatrics", doctor: "Dr. R. Mehta", days: "Mon, Wed, Fri", timings: "2:00 PM – 5:00 PM", room: "102" },
      { department: "Orthopaedics", doctor: "Dr. S. Rane", days: "Tuesday, Thursday", timings: "11:00 AM – 2:00 PM", room: "103" },
      { department: "Gynaecology", doctor: "Dr. P. Nair", days: "Monday to Saturday", timings: "9:30 AM – 12:30 PM", room: "104" },
      { department: "ENT", doctor: "Dr. V. Kulkarni", days: "Wednesday, Saturday", timings: "10:30 AM – 1:30 PM", room: "105" },
      { department: "Dermatology", doctor: "Dr. N. Desai", days: "Tuesday, Thursday", timings: "3:00 PM – 6:00 PM", room: "106" },
      { department: "Cardiology", doctor: "Dr. M. Iyer", days: "Monday, Thursday", timings: "12:00 PM – 3:00 PM", room: "107" },
    ],
  },
];

export const dayCareData: InfoSection[] = [
  {
    title: "Overview",
    description: [
      "At SVKM's Tapanbhai Mukeshbhai Patel Memorial Hospital, our Day Care services are designed for patients who require medical treatment, minor surgical procedures, or therapies that do not need an overnight stay.",
      "Day Care is a convenient and cost-effective option that blends medical expertise with patient comfort.",
    ],
    image: "/images/day-care/overview.png",
  },
  {
    title: "Benefits of Day Care",
    description: [
      "Day Care services bring multiple advantages including same-day discharge, reduced cost of treatment, and the ability to recover in the comfort of your own home.",
      "Shorter waiting times, quicker recovery, and personalised supervision make the Day Care experience efficient and reassuring.",
    ],
    image: "/images/day-care/Benefits_of_Day_Care.png",
  },
  {
    title: "Common Day Care Procedures",
    description: [
      "Our hospital offers a wide range of treatments including chemotherapy sessions, minor surgeries such as biopsies, cyst removal, dialysis, endoscopy, colonoscopy, and blood transfusions.",
      "Patients can also avail services such as IV therapies, vaccinations, and certain diagnostic tests through Day Care.",
    ],
    image: "/images/day-care/Common_Day_Care_Procedures.png",
  },
  {
    title: "Admission & Process",
    description: [
      "Patients scheduled for Day Care treatment are requested to report to the Day Care reception with all necessary documents, prescriptions, and medical history.",
      "After treatment, patients are observed for a short period to ensure stability before discharge.",
    ],
    image: "/images/day-care/pre_admission.png",
  },
  {
    title: "Facilities Available",
    description: [
      "The Day Care unit includes comfortable beds and recliners, an experienced medical team, easy access to diagnostic services, and an in-house pharmacy.",
      "For family members, a dedicated waiting lounge with assistance for insurance and billing formalities is available.",
    ],
    image: "/images/day-care/room_types_and_facilities.png",
  },
  {
    title: "Discharge & Follow-up",
    description: [
      "Once the procedure is complete and the doctor confirms the patient's stability, discharge is initiated. Patients receive discharge summary, medications, and post-treatment care instructions.",
      "If follow-up appointments are necessary, they are scheduled immediately to ensure continuity of care.",
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
      { year: 5, description: "Min 5 years of experience of working in different departments of Pathology Lab." },
      { year: 8, description: "Min 8 years' experience of working in different departments of Pathology Lab." },
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
      { year: 2, description: "2 years' experience working in relevant department of Pathology Lab." },
      { year: 4, description: "Min 4 years' experience working in relevant department of Pathology Lab." },
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
      { year: 2, description: "2 years' experience working in relevant department of Pathology Lab." },
      { year: 4, description: "Min 4 years' experience working in relevant department of Pathology Lab." },
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
      "B.Sc Nursing / GNM",
      "Valid nursing registration",
    ],
    yearsOfExperience: [
      { year: 1, description: "Minimum 1 year of clinical nursing experience." },
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
      "MBBS from a recognised university",
      "Valid MCI / NMC registration",
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
