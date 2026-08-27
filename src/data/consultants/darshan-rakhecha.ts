import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 10,
  name: "Dr. Darshan Vinod Rakhecha",
  tags: ["General Medicine"],
  profilePhoto: "/images/doctors/DR_DARSHAN_RAKHECHA.png",
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
