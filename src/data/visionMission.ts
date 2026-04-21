import type { VisionMissionData } from "@/types";

export const missionVisionData: VisionMissionData = {
  vision: {
    icon: "fa-solid fa-user-doctor",
    title: "Vision",
    text: `To be a pioneering centre of healing, nursing and clinical learning that delivers world-class, affordable healthcare to one and all in Maharashtra and beyond with a special commitment to tribal and rural communities, while nurturing the next generation of medical professionals.`,
  },
  mission: {
    icon: "fa-solid fa-arrows-up-down-left-right",
    title: "Mission",
    points: [
      {
        icon: "fa-solid fa-stethoscope",
        text: "Deliver advanced medical care that combines modern technology with compassionate service.",
      },
      {
        icon: "fa-solid fa-hand-holding-medical",
        text: 'Keep healthcare affordable and accessible to all through our "No Profit, No Loss" philosophy.',
      },
      {
        icon: "fa-solid fa-user-graduate",
        text: "Train and inspire future doctors, nurses, and researchers through a world-class Medical Education Hub.",
      },
      {
        icon: "fa-solid fa-seedling",
        text: "Lead innovation in tribal and rural health, setting benchmarks for India.",
      },
      {
        icon: "fa-solid fa-heart-pulse",
        text: "Uphold ethical care, integrity, empathy, and patient-first values in everything we do.",
      },
    ],
  },
};
