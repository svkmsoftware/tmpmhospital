import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 14,
  name: "Dr. Sagar Nana More",
  tags: ["Anaesthesia"],
  profilePhoto: "/images/doctors/DR_SAGAR_MORE.png",
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
