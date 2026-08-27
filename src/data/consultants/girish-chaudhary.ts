import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 9,
  name: "Dr. Girish Premnath Chaudhary",
  tags: ["Pathology"],
  profilePhoto: "/images/doctors/DR_GIRISH_CHAUDHARI.png",
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
