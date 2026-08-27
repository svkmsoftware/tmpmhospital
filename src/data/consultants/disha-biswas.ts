import type { Doctor } from "@/types";
import { DEFAULT_OPD_TIMING } from "./defaultOpdTiming";

// No headshot on file yet — using the standard female-doctor default from
// /images/icons/ (swap for a real photo whenever one's available). She's a
// real OB-GYN consultant referenced on the Obstetrics & Gynaecology
// department page, so she needs her own record like everyone else rather
// than a one-off inline entry that can't be looked up by id.
const doctor: Doctor = {
  id: 17,
  name: "Dr. Disha Biswas",
  tags: ["Obstetrics & Gynaecology"],
  profilePhoto: "/images/icons/female_doctor.png",
  bio_data: {
    opdTiming: { ...DEFAULT_OPD_TIMING },
    aboutDoctor: [],
    educationQualification: [],
    experience: [],
    honoursAndAwards: [],
    publication: [],
  },
  department: ["obstetrics-gynecology"],
};

export default doctor;
