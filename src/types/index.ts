// ─── Doctor ───────────────────────────────────────────────────────────────────
export interface OpdTiming {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface DoctorBioData {
  opdTiming: OpdTiming;
  aboutDoctor: string[];
  educationQualification: string[];
  experience: string[];
  honoursAndAwards: string[];
  publication: string[];
}

export interface Doctor {
  id: number;
  name: string;
  tags: string[];
  profilePhoto: string;
  bio_data: DoctorBioData;
  department: string[];
}

// ─── Department ───────────────────────────────────────────────────────────────
export interface DepartmentConsultant {
  name: string;
  tags: string[];
  profilePhoto: string;
}

export interface DepartmentTab {
  name: string;
  image: string;
  intro: string;
  details: string | string[];
}

export interface DepartmentItem {
  slug: string;
  title: string;
  banner_image: string;
  description: string;
  icon: string;
  tabs: DepartmentTab[];
  consultants: DepartmentConsultant[];
}

export interface DepartmentCategory {
  category: string;
  tagline: string;
  items: DepartmentItem[];
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
export interface Blog {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
  date?: string;
  excerpt?: string;
  author?: string;
}

// ─── Job Opening ──────────────────────────────────────────────────────────────
export interface ExperienceRequirement {
  year: number;
  description: string;
}

export interface JobOpening {
  id: number;
  designation: string;
  numberOfPost: number;
  educationQualification: string[];
  yearsOfExperience: ExperienceRequirement[];
  applicationStartDate: string;
  applicationEndDate: string;
  department?: string;
  location?: string;
}

// ─── Insurance Company ────────────────────────────────────────────────────────
export interface InsuranceCompany {
  id: number;
  name: string;
  imageUrl: string;
  docLink: string;
}

// ─── IPD / Day Care ───────────────────────────────────────────────────────────
export interface InfoSection {
  title: string;
  description: string[];
  image: string;
}

// ─── OPD ──────────────────────────────────────────────────────────────────────
export interface OpdScheduleEntry {
  department: string;
  doctor: string;
  days: string;
  timings: string;
  room: string;
}

export interface OpdSection {
  section: string;
  description?: string;
  image?: string;
  schedule?: OpdScheduleEntry[];
}

// ─── Vision Mission ───────────────────────────────────────────────────────────
export interface MissionPoint {
  icon: string;
  text: string;
}

export interface VisionMissionData {
  vision: { icon: string; title: string; text: string };
  mission: { icon: string; title: string; points: MissionPoint[] };
}

// ─── Management Team ──────────────────────────────────────────────────────────
export interface ManagementMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  bio?: string;
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category?: string;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

// ─── Stat ─────────────────────────────────────────────────────────────────────
export interface HospitalStat {
  id: number;
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

// ─── Why Work With Us ─────────────────────────────────────────────────────────
export interface WhyWorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

// ─── API Response wrapper ─────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
