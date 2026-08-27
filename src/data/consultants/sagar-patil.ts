import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

const doctor: Doctor = {
  id: 5,
  name: "Dr. Sagar Manohar Patil",
  tags: ["Neurosurgery"],
  profilePhoto: "/images/doctors/DR_SAGAR_PATIL.png",
  bio_data: {
    opdTiming: { ...DEFAULT_OPD_TIMING },
    aboutDoctor: [],
    educationQualification: [],
    experience: [],
    honoursAndAwards: [],
    publication: [],
  },
  // No standalone "Neurosurgery" department exists in departments.ts — mapped
  // to Neurosciences (Brain & Spine), the closest umbrella department. Update
  // if a dedicated Neurosurgery department gets added later.
  department: ["neurosciences"],
};

export default doctor;
