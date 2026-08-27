import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 1,
  name: "Dr. Darshana Jamsing Pawara",
  tags: ["General Medicine"],
  profilePhoto: "/images/doctors/DR_DARSHANA_PAWARA.png",
  bio_data: {
    opdTiming: { ...DEFAULT_OPD_TIMING },
    aboutDoctor: [],
    educationQualification: [],
    experience: [],
    honoursAndAwards: [],
    publication: [],
  },
  department: ["general-medicine"],
};

export default doctor;
