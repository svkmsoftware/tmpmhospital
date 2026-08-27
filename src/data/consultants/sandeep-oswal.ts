import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 15,
  name: "Dr. Sandeep Jivraj Oswal",
  tags: ["Pathology"],
  profilePhoto: "/images/doctors/DR_SANDEEP_OSWAL.png",
  bio_data: {
    opdTiming: { ...DEFAULT_OPD_TIMING },
    aboutDoctor: [],
    educationQualification: [],
    experience: [],
    honoursAndAwards: [],
    publication: [],
  },
  department: ["pathology-lab"],
};

export default doctor;
