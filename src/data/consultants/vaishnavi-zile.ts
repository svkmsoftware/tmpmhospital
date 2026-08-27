import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 3,
  name: "Dr. Vaishnavi Sudhakarrao Zile",
  tags: ["Anaesthesia"],
  profilePhoto: "/images/doctors/DR_VAISHNAVI_ZILE.png",
  bio_data: {
    opdTiming: { ...DEFAULT_OPD_TIMING },
    aboutDoctor: [],
    educationQualification: [],
    experience: [],
    honoursAndAwards: [],
    publication: [],
  },
  department: ["anaesthesiology"],
};

export default doctor;
