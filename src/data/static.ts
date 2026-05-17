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
  { id: 1, value: 1200, suffix: "",   label: "Total Beds",              icon: "bed"         },
  { id: 2, value: 150,  suffix: "+",  label: "ICU Beds (incl. NICU & PICU)", icon: "heart-pulse" },
  { id: 3, value: 34,   suffix: "",   label: "Emergency Beds",          icon: "ambulance"   },
  { id: 4, value: 17,   suffix: "",   label: "Major OTs",               icon: "scissors"    },
  { id: 5, value: 9,    suffix: "",   label: "Minor OTs",               icon: "scissors"    },
  { id: 6, value: 1,    suffix: "",   label: "Catheterization Lab",     icon: "heart"       },
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
    question: "Does the hospital accept cashless insurance and government schemes?",
    answer: "Yes. We are empanelled with PMJAY, MJPJAY, ESIC, CGHS, ECHS, Ayushman Vay Vandana, and many more government schemes, as well as major TPA and private insurance providers. Please carry your scheme/insurance card and valid ID.",
    category: "Billing",
  },
  {
    id: 4,
    question: "Is emergency care available 24/7?",
    answer: "Yes, our Emergency Department operates 24 hours a day, 7 days a week, including all public holidays. We have 34 emergency beds, dedicated emergency physicians, and 2 ACLS + 4 BLS ambulances always on duty.",
    category: "Emergency",
  },
  {
    id: 5,
    question: "What facilities are available for in-patients?",
    answer: "We offer general wards, semi-private, private, and deluxe rooms. All rooms include nursing care, housekeeping, and essential amenities. ICU (150+ beds), NICU (28 beds), and PICU (20 beds) are available for critical cases.",
    category: "Facilities",
  },
  {
    id: 6,
    question: "Does the hospital have a pharmacy and blood bank?",
    answer: "Yes, an in-house pharmacy and a fully equipped Blood Bank are available on the hospital premises. The pharmacy operates from 8:00 AM to 10:00 PM; emergency medicines are available round the clock.",
    category: "Facilities",
  },
  {
    id: 7,
    question: "What dialysis facilities are available?",
    answer: "We have an 18-bed Dialysis unit offering regular and emergency dialysis services. We are also empanelled under the PMNDP (National Dialysis Programme) for government-subsidised dialysis.",
    category: "Services",
  },
  {
    id: 8,
    question: "What imaging and diagnostic services does the hospital offer?",
    answer: "Our Radiology department includes MRI (Helium-free), CT Scan, Mammography, X-Ray, C-Arm Imaging, BDM Scanner, and Ultrasound. Our Central Clinical Laboratory (CCL) is a 2500 sq.ft. state-of-the-art facility.",
    category: "Diagnostics",
  },
];

export const galleryImages: GalleryImage[] = [
  { id: 1, src: "/images/gallery/gallery-1.jpg", alt: "Hospital Facility",      category: "Facilities"  },
  { id: 2, src: "/images/gallery/gallery-2.jpg", alt: "Patient Care",           category: "Care"        },
  { id: 3, src: "/images/gallery/gallery-3.jpg", alt: "Medical Team",           category: "Team"        },
  { id: 4, src: "/images/gallery/gallery-4.jpg", alt: "Hospital Building",      category: "Facilities"  },
  { id: 5, src: "/images/gallery/gallery-5.jpg", alt: "OPD Area",              category: "Facilities"  },
  { id: 6, src: "/images/gallery/gallery-6.jpg", alt: "Laboratory",             category: "Technology"  },
  { id: 7, src: "/images/gallery/gallery-7.jpg", alt: "Operation Theatre",      category: "Technology"  },
  { id: 8, src: "/images/gallery/gallery-8.jpg", alt: "ICU Unit",              category: "Technology"  },
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
    bio: "Ms. Oberoi manages talent acquisition, staff development, and organisational culture across the hospital.",
  },
  {
    id: 5,
    name: "Mr. Arunkumar Rangdale",
    designation: "Head- Marketing & Sales",
    image: "/images/managementTeam/arunkumar_rangdale.png",
    bio: "A seasoned healthcare leader, Arunkumar brings over 26 years of experience to the role. He has spent over a decade in hospital management at renowned institutions, including Kokilaben Dhirubhai Ambani Hospital, SRV Hospital, HCG Cancer Hospitals & Apex Group of Hospitals. Complementing this is 16 years of domestic and international experience in the pharmaceutical industry with prestigious firms like Dr. Reddy’s, American Remedies, and Neopharma (Qatar, Abu Dhabi, Dubai).",
  },
  {
    id: 6,
    name: "Dr. Sagar Ramchandra Mali",
    designation: "Insurance Administrator",
    image: "/images/managementTeam/sagar_ramchandra_mali.png",
    bio: "Public healthcare professional with over 11 years of diverse experience in the public health sector, specializing in government insurance schemes and quality assurance for government hospitals. Actively contributed to the implementation, coordination, and monitoring of state and national-level health insurance programs, ensuring access to care for underserved populations.",
  },
  {
    id: 7,
    name: "Mr. Vinod B. Tondwal",
    designation: "Assistant Director of Information Technology",
    image: "/images/managementTeam/user.png",
    bio: "Over 25 years of experience in Information Technology Services management, strategic planning, clinical & LIS operation management, infrastructure, training, IT consulting, IT project management, IT security, and IT asset & license management. Certified with internationally recognised certifications like MCSA, ITIL, RedHat, and AWS. He has extensive experience as an IT Head in reputed multinational companies like Birla Precision Technologies Pvt. Ltd., Siddharth Carbochem Products Ltd, and Dubai-based Gulf Jyoti International.",
  },
  {
    id: 8,
    name: "Dr. Girish Chaudhari",
    designation: "Consultant, Pathology & Blood Bank",
    image: "/images/managementTeam/girish_chaudhari.png",
    bio: "A distinguished medical professional with 33 years of experience in the fields of Pathology and Blood Banking. Throughout a career spanning over three decades in service to the Government of Maharashtra, Dr. Chaudhari has been instrumental in modernizing blood transfusion services and establishing specialized clinical centers across the state.",
  },
  {
    id: 9,
    name: "Mr. Mithun Gopalan",
    designation: "Maintenance In-Charge",
    image: "/images/managementTeam/user.png",
    bio: "Competent and result-oriented Mechanical Engineer with rich experience across operation & maintenance of mechanical equipment such as electrical, heating, ventilation, plumbing, air conditioning equipment, and other facility services. Skilled in streamlining daily operations, managing people, resources, and processes to achieve organizational objectives.",
  },
  {
    id: 10,
    name: "Mr. Jignesh Sheth",
    designation: "Assistant Director – Software & New Initiatives",
    image: "/images/managementTeam/user.png",
    bio: "Seasoned Healthcare IT professional with over two decades of experience in Healthcare IT Operations, ERP implementation, and project management. Jignesh has worked with renowned hospitals like Jupiter, Sir H.N. Reliance, HCG, Jaslok, and Bhatia in driving digital transformation, optimizing operational processes, and successfully delivering HMIS/ERP initiatives to improve organizational efficiency.",
  },
];

export const whyWorkWithUs: WhyWorkItem[] = [
  { id: 1, title: "Professional Growth",        description: "We invest in our people. From continuous medical education to leadership development programmes, your career will thrive here.", image: "/images/whyWorkWithUs_banner_1.png" },
  { id: 2, title: "State-of-the-Art Facilities", description: "Work with the latest medical technology in a modern, well-equipped environment that empowers you to deliver the best care.",  image: "/images/whyWorkWithUs_banner_2.png" },
  { id: 3, title: "Collaborative Culture",       description: "Be part of a multidisciplinary team that values collaboration, respect, and shared mission for patient well-being.",           image: "/images/whyWorkWithUs_banner_3.png" },
  { id: 4, title: "Community Impact",            description: "Make a real difference. Our work reaches tribal and rural communities that have historically been underserved.",                 image: "/images/whyWorkWithUs_banner_4.png" },
  { id: 5, title: "Competitive Benefits",        description: "We offer competitive compensation, health benefits, and a supportive work environment for all staff members.",                  image: "/images/whyWorkWithUs_banner_5.png" },
];

export const insuranceCompanies: InsuranceCompany[] = [
  { id: 1,  name: "Aditya Birla Capital",      imageUrl: "/images/insurance_companies/aditya_birla_capital.png",      docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 2,  name: "Bajaj Life Insurance",      imageUrl: "/images/insurance_companies/bajaj_life_insurance.png",      docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 3,  name: "Care Health Insurance",     imageUrl: "/images/insurance_companies/care_health_insurance.png",     docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 4,  name: "ICICI Lombard",             imageUrl: "/images/insurance_companies/icici_lombard.png",             docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 5,  name: "Kotak General Insurance",  imageUrl: "/images/insurance_companies/kotak_general_insurance.png",  docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 6,  name: "Medi Buddy Insurance",     imageUrl: "/images/insurance_companies/medi_buddy_insurance.png",     docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 7,  name: "Reliance General Insurance",imageUrl: "/images/insurance_companies/reliance_general_insurance.png",docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
  { id: 8,  name: "Tata AIG Insurance",       imageUrl: "/images/insurance_companies/tata_aig_insurance.png",       docLink: "https://drive.google.com/file/d/1NwknBv6CLrQuvuN_OXUSVcNJQhw2xTCB/view?usp=sharing" },
];
