import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 8,
  name: "Dr. Ashwin Suresh Baviskar",
  tags: ["Radiology"],
  profilePhoto: "/images/doctors/DR_ASHWIN_BAVISKAR.png",
  bio_data: {
    opdTiming: { ...DEFAULT_OPD_TIMING },
    aboutDoctor: [],
    educationQualification: [],
    experience: [],
    honoursAndAwards: [],
    publication: [],
  },
  department: ["radiology"],
};

export default doctor;
