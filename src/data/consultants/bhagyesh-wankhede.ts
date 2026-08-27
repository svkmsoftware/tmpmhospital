import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 7,
  name: "Dr. Bhagyesh Rajaram Wankhede",
  tags: ["Radiology"],
  profilePhoto: "/images/doctors/DR_BHAGYESH_WANHEDE.png",
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
