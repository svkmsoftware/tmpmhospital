import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 16,
  name: "Dr. Subham Ranvirsing Patil",
  tags: ["Emergency Medicine"],
  profilePhoto: "/images/doctors/DR_SHUBHAM_PATIL.png",
  bio_data: {
    opdTiming: { ...DEFAULT_OPD_TIMING },
    aboutDoctor: [],
    educationQualification: [],
    experience: [],
    honoursAndAwards: [],
    publication: [],
  },
  department: ["emergency-care"],
};

export default doctor;
