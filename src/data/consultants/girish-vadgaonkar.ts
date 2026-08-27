import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 6,
  name: "Dr. Girish Vitthalrao Vadgaonkar",
  tags: ["General Medicine"],
  profilePhoto: "/images/doctors/DR_GIRISH_VADGAONKAR.png",
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
