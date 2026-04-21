import type { Testimonial, HospitalStat, FAQ, GalleryImage, ManagementMember, WhyWorkItem, InsuranceCompany } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ramesh Patil",
    role: "Patient — General Surgery",
    image: "/images/male_user.png",
    text: "The surgical team at TMPM Hospital performed my operation with exceptional skill. The post-operative care was outstanding and I was back on my feet within a week. Highly recommend this hospital.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sunita Sharma",
    role: "Patient — Obstetrics",
    image: "/images/female_user.png",
    text: "I delivered my baby here and the entire experience was wonderful. The doctors and nurses were caring, professional, and always available. The facilities are world-class for a hospital in this region.",
    rating: 5,
  },
  {
    id: 3,
    name: "Vijay Mahajan",
    role: "Patient — General Medicine",
    image: "/images/male_user.png",
    text: "Being from a village near Shirpur, having a multispecialty hospital this close to home is a blessing. The doctors explained my condition clearly and the treatment was very affordable.",
    rating: 5,
  },
  {
    id: 4,
    name: "Priya Deshmukh",
    role: "Patient — Paediatrics",
    image: "/images/female_user.png",
    text: "My child was admitted for a fever and the paediatric team handled everything with great care and empathy. They kept us informed at every step. Truly a hospital that cares.",
    rating: 5,
  },
];

export const hospitalStats: HospitalStat[] = [
  { id: 1, value: 1200, suffix: "+", label: "Total Beds", icon: "bed" },
  { id: 2, value: 120, suffix: "+", label: "Critical Care Beds", icon: "heart-pulse" },
  { id: 3, value: 34, suffix: "+", label: "Emergency Beds", icon: "ambulance" },
  { id: 4, value: 17, suffix: "", label: "Operation Theatres", icon: "scissors" },
  { id: 5, value: 50, suffix: "+", label: "Specialist Doctors", icon: "stethoscope" },
  { id: 6, value: 1, suffix: "", label: "Catheterization Lab", icon: "heart" },
];

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "What are the visiting hours at TMPM Hospital?",
    answer: "General visiting hours are 8:00 AM – 8:00 PM daily. ICU visits are permitted twice a day (10:00 AM – 11:00 AM and 5:00 PM – 6:00 PM). Only one attendant per patient is allowed at a time.",
    category: "Visiting",
  },
  {
    id: 2,
    question: "How do I book an appointment with a doctor?",
    answer: "You can book an appointment by calling our helpline, visiting the hospital reception, or through our online portal. We recommend booking in advance to reduce waiting time.",
    category: "Appointments",
  },
  {
    id: 3,
    question: "Does the hospital accept cashless insurance?",
    answer: "Yes, we have tie-ups with major TPA and insurance providers including Aditya Birla Capital, Bajaj Life Insurance, Care Health Insurance, ICICI Lombard, and more. Please carry your insurance card and valid ID.",
    category: "Billing",
  },
  {
    id: 4,
    question: "Is emergency care available 24/7?",
    answer: "Yes, our Emergency Department operates 24 hours a day, 7 days a week, including all public holidays. We have 34 emergency beds and dedicated emergency physicians always on duty.",
    category: "Emergency",
  },
  {
    id: 5,
    question: "What facilities are available for in-patients?",
    answer: "We offer general wards, semi-private, private, and deluxe rooms. All rooms include nursing care, housekeeping, and essential amenities. ICU and HDU are available for critical cases.",
    category: "Facilities",
  },
  {
    id: 6,
    question: "Does the hospital have a pharmacy?",
    answer: "Yes, an in-house pharmacy is available on the hospital premises and operates from 8:00 AM to 10:00 PM. Emergency medicines are available round the clock.",
    category: "Facilities",
  },
];

export const galleryImages: GalleryImage[] = [
  { id: 1, src: "/images/gallery/gallery-1.jpg", alt: "Hospital Facility", category: "Facilities" },
  { id: 2, src: "/images/gallery/gallery-2.jpg", alt: "Patient Care", category: "Care" },
  { id: 3, src: "/images/gallery/gallery-3.jpg", alt: "Medical Team", category: "Team" },
  { id: 4, src: "/images/gallery/gallery-4.jpg", alt: "Hospital Building", category: "Facilities" },
  { id: 5, src: "/images/gallery/gallery-5.jpg", alt: "OPD Area", category: "Facilities" },
  { id: 6, src: "/images/gallery/gallery-6.jpg", alt: "Laboratory", category: "Technology" },
  { id: 7, src: "/images/gallery/gallery-7.jpg", alt: "Operation Theatre", category: "Technology" },
  { id: 8, src: "/images/gallery/gallery-8.jpg", alt: "ICU Unit", category: "Technology" },
];

export const managementTeam: ManagementMember[] = [
  {
    id: 1,
    name: "Mr. Abey Varghese",
    designation: "Chief Executive Officer",
    image: "/images/managementTeam/abey_varghese.png",
    bio: "With extensive experience in hospital administration and healthcare management, Mr. Varghese leads the hospital's strategic growth and operational excellence.",
  },
  {
    id: 2,
    name: "Mr. Gajendra Pawaskar",
    designation: "Chief Financial Officer",
    image: "/images/managementTeam/gajendra_pawaskar.png",
    bio: "Mr. Pawaskar oversees financial planning, budgeting, and ensures sustainable growth of hospital operations.",
  },
  {
    id: 3,
    name: "Ms. Jaya Mathew",
    designation: "Chief Nursing Officer",
    image: "/images/managementTeam/jaya_mathew.png",
    bio: "Ms. Mathew leads our team of dedicated nurses, ensuring the highest standards of patient care and nursing practices.",
  },
  {
    id: 4,
    name: "Ms. Kawaljeet Oberoi",
    designation: "Head of Human Resources",
    image: "/images/managementTeam/kawaljeet_oberoi.png",
    bio: "Ms. Oberoi manages talent acquisition, staff development, and organizational culture across the hospital.",
  },
];

export const whyWorkWithUs: WhyWorkItem[] = [
  {
    id: 1,
    title: "Professional Growth",
    description: "We invest in our people. From continuous medical education to leadership development programs, your career will thrive here.",
    image: "/images/whyWorkWithUs_banner_1.png",
  },
  {
    id: 2,
    title: "State-of-the-Art Facilities",
    description: "Work with the latest medical technology in a modern, well-equipped environment that empowers you to deliver the best care.",
    image: "/images/whyWorkWithUs_banner_2.png",
  },
  {
    id: 3,
    title: "Collaborative Culture",
    description: "Be part of a multidisciplinary team that values collaboration, respect, and shared mission for patient well-being.",
    image: "/images/whyWorkWithUs_banner_3.png",
  },
  {
    id: 4,
    title: "Community Impact",
    description: "Make a real difference. Our work reaches tribal and rural communities that have historically been underserved.",
    image: "/images/whyWorkWithUs_banner_4.png",
  },
  {
    id: 5,
    title: "Competitive Benefits",
    description: "We offer competitive compensation, health benefits, and a supportive work environment for all staff members.",
    image: "/images/whyWorkWithUs_banner_5.png",
  },
];

export const insuranceCompanies: InsuranceCompany[] = [
  { id: 1, name: "Aditya Birla Capital", imageUrl: "/images/insurance_companies/aditya_birla_capital.png", docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 2, name: "Bajaj Life Insurance", imageUrl: "/images/insurance_companies/bajaj_life_insurance.png", docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 3, name: "Care Health Insurance", imageUrl: "/images/insurance_companies/care_health_insurance.png", docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 4, name: "ICICI Lombard", imageUrl: "/images/insurance_companies/icici_lombard.png", docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 5, name: "Kotak General Insurance", imageUrl: "/images/insurance_companies/kotak_general_insurance.png", docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 6, name: "Medi Buddy Insurance", imageUrl: "/images/insurance_companies/medi_buddy_insurance.png", docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 7, name: "Reliance General Insurance", imageUrl: "/images/insurance_companies/reliance_general_insurance.png", docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 8, name: "Tata AIG Insurance", imageUrl: "/images/insurance_companies/tata_aig_insurance.png", docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
];
