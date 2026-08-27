import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 11,
  name: "Dr. Manasi Jayant Sonar",
  tags: ["Dental"],
  profilePhoto: "/images/doctors/DR_MANASI_SONAR.png",
  bio_data: {
    opdTiming: { ...DEFAULT_OPD_TIMING },
    aboutDoctor: [],
    educationQualification: [],
    experience: [],
    honoursAndAwards: [],
    publication: [],
  },
  department: ["dental"],
};

export default doctor;
