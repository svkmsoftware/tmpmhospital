import type { Doctor } from "@/types";

const doctor: Doctor = {
  id: 2,
  name: "Dr. Shivram Gopal Pawara",
  tags: ["Obstetrics & Gynecology"],
  profilePhoto: "/images/doctors/DR_SHIVRAM_PAWARA.png",
  bio_data: {
    // Alternate-day clinic with a morning-only Saturday — different from
    // the standard schedule, so this is written out explicitly rather than
    // using DEFAULT_OPD_TIMING.
    opdTiming: {
      monday: "11:00 AM – 2:00 PM",
      tuesday: "Closed",
      wednesday: "11:00 AM – 2:00 PM",
      thursday: "Closed",
      friday: "11:00 AM – 2:00 PM",
      saturday: "10:00 AM – 12:00 PM",
      sunday: "Closed",
    },
    aboutDoctor: [],
    educationQualification: [],
    experience: [],
    honoursAndAwards: [],
    publication: [],
  },
  department: ["obstetrics-gynecology"],
};

export default doctor;
