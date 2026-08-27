import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 12,
  name: "Dr. Naina Chaudhari",
  tags: ["Physiotherapy"],
  profilePhoto: "/images/doctors/DR_NAINA_CHAUDHARI.png",
  bio_data: {
    opdTiming: { ...DEFAULT_OPD_TIMING },
    aboutDoctor: [],
    educationQualification: [],
    experience: [],
    honoursAndAwards: [],
    publication: [],
  },
  department: ["physiotherapy"],
};

export default doctor;
