import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 4,
  name: "Dr. Dhiraj Indrasing Rane",
  tags: ["Orthopaedics"],
  profilePhoto: "/images/doctors/DR_DHIRAJ_RANE.png",
  bio_data: {
    opdTiming: { ...DEFAULT_OPD_TIMING },
    aboutDoctor: [],
    educationQualification: [],
    experience: [],
    honoursAndAwards: [],
    publication: [],
  },
  department: ["orthopedics"],
};

export default doctor;
