import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 13,
  name: "Dr. Prashant Khairnar",
  tags: ["Consultant Urologist"],
  profilePhoto: "/images/doctors/DR_PRASHANT_KHAIRNAR.png",
  bio_data: {
    opdTiming: { ...DEFAULT_OPD_TIMING },
    aboutDoctor: [],
    educationQualification: [],
    experience: [],
    honoursAndAwards: [],
    publication: [],
  },
  department: ["urology"],
};

export default doctor;
