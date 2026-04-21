import type { DepartmentCategory } from "@/types";

export const departments: DepartmentCategory[] = [
  {
    category: "Specialty",
    tagline: "Comprehensive care across core medical fields for every stage of life.",
    items: [
      {
        slug: "general-medicine",
        title: "General Medicine",
        banner_image: "/images/general_medicine_banner.png",
        description: "Department of Medicine including Infectious Diseases, Endocrinology, Rheumatology, Geriatric Medicine",
        icon: "stethoscope",
        tabs: [
          {
            name: "Overview",
            image: "/images/general_medicine_overview.png",
            intro: "Mission of team is to serve medical needs of society with a humane, sympathetic caring attitude by health professionals who have an astute clinical sense, latest knowledge, excellent clinical skills with 360-degree experience.",
            details: [
              "A multitude of talented physicians provide patient-centred comprehensive care, conduct physical examinations in outpatient, equipped with most modern facilities. Relevant blood tests, diagnostic procedures are conducted for treatment in outpatient/inpatient basis.",
              "Patients benefit from in-house diagnostic services, emergency response systems, that prioritize patient safety, recovery, and long-term wellness. Specialty clinics for Diabetes, Hypertension, HIV/AIDS, Geriatric Medicine, and Family Medicine are inbuilt.",
            ],
          },
          {
            name: "Technology & Procedure",
            image: "/images/general_medicine_technology_procedure.png",
            intro: "State-of-art technology with Stress test, Holter monitoring, ambulatory blood pressure monitoring, Spirometry, Pulmonary function tests, Non-invasive multi-para monitors, ventilators — all available for excellent tertiary level care at affordable cost.",
            details: "",
          },
          {
            name: "Academics & Research",
            image: "/images/general_medicine_academics_research.png",
            intro: "Our team actively participates in clinical research, case audits, and continuing medical education programmes.",
            details: "",
          },
        ],
        consultants: [
          { name: "Dr. Sample Doctor", tags: ["General Medicine"], profilePhoto: "/images/doctors/Male_doctor.png" },
        ],
      },
      {
        slug: "general-surgery",
        title: "General Surgery",
        banner_image: "/images/general_surgery_banner.png",
        description: "Department of General Surgery including Minimally Invasive Surgery",
        icon: "scissors",
        tabs: [
          {
            name: "Overview",
            image: "/images/sample_overview.png",
            intro: "Department provides comprehensive range of services with various surgical procedures — open, advanced minimally invasive laparoscopic surgery for trauma to hernia, thoracic, endocrine, breast, gastrointestinal, hepatobiliary, pancreatic, colonic, anorectal conditions.",
            details: "It provides a full spectrum of surgical services under one roof, from elective onco-surgical procedures to complex emergency surgeries for burns, trauma, and peritonitis.",
          },
          {
            name: "Technology & Procedure",
            image: "/images/sample_technologyProcedure.png",
            intro: "Well-equipped state-of-art modern operation theatres equipped with laparoscopic towers, latest gadgets for endoscopic surgery with Laser and Cryosurgery.",
            details: "Surgical Robot enhances precision and flexibility in complex procedures. Harmonic Scalpel, Surgical Staplers, VAC Dressing Units are used for best surgical outcomes.",
          },
          {
            name: "Academics & Research",
            image: "/images/sample_academicsResearch.png",
            intro: "Our surgical team contributes actively to academic conferences, case presentations, and evidence-based practice.",
            details: "",
          },
        ],
        consultants: [
          { name: "Dr. Sample Doctor", tags: ["General Surgery"], profilePhoto: "/images/doctors/Male_doctor.png" },
        ],
      },
      {
        slug: "obstetrics-gynecology",
        title: "Obstetrics & Gynaecology",
        banner_image: "/images/gynecologist_banner.png",
        description: "Department of Obstetrics & Gynaecology with Minimal Invasive Surgery, ART, Maternal-Foetal Medicine",
        icon: "heart",
        tabs: [
          {
            name: "Overview",
            image: "/images/gynocology_overview.png",
            intro: "With state-of-art infrastructure and integrated academic ecosystem, the department provides quality services to pregnant women, adopting safe birth practices, quality post-natal services, and prevention of morbidity due to gynaecological disorders.",
            details: [
              "Skilled, compassionate team provides quality services with a human touch — not only to hospital patients but to the community through reproductive health outreach.",
              "Well-equipped labour room, eclampsia room, HDU, ICU, and separate septic ward ensure comprehensive care for all cases.",
            ],
          },
          {
            name: "Technology & Procedure",
            image: "/images/gynocology_procedure.png",
            intro: "Operation theatres equipped for all kinds of complex obstetric and gynaecological surgeries including minimally invasive and robotic-assisted procedures.",
            details: "",
          },
          {
            name: "Academics & Research",
            image: "/images/gynocology_technology.png",
            intro: "Active participation in maternal health research, FOGSI activities, and community health programmes.",
            details: "",
          },
        ],
        consultants: [
          { name: "Dr. Shakuntala Chhabra", tags: ["Senior Consultant", "Obstetrics & Gynaecology"], profilePhoto: "/images/doctors/Shakuntala_Chhabra.png" },
        ],
      },
      {
        slug: "pediatrics",
        title: "Paediatrics",
        banner_image: "/images/pediatrics_banner.png",
        description: "Comprehensive child healthcare from neonates to adolescents",
        icon: "baby",
        tabs: [
          {
            name: "Overview",
            image: "/images/sample_overview.png",
            intro: "Our Paediatrics Department provides comprehensive healthcare for children from birth through adolescence, with dedicated NICU, PICU, and general paediatric wards.",
            details: "The department handles a wide spectrum of paediatric conditions including neonatal care, infectious diseases, nutritional disorders, developmental issues, and emergency paediatric care.",
          },
          {
            name: "Technology & Procedure",
            image: "/images/sample_technologyProcedure.png",
            intro: "State-of-the-art NICU with advanced monitoring, ventilators, phototherapy units, and specialised neonatal care equipment.",
            details: "",
          },
          {
            name: "Academics & Research",
            image: "/images/sample_academicsResearch.png",
            intro: "Active research and academic involvement in paediatric nutrition, infectious diseases, and neonatal outcomes.",
            details: "",
          },
        ],
        consultants: [
          { name: "Dr. Sample Doctor", tags: ["Paediatrics"], profilePhoto: "/images/doctors/Male_doctor.png" },
        ],
      },
      {
        slug: "orthopedics",
        title: "Orthopaedics",
        banner_image: "/images/orthopedics_banner.png",
        description: "Department of Orthopaedics including Joint Replacement, Spine Surgery, Trauma",
        icon: "bone",
        tabs: [
          {
            name: "Overview",
            image: "/images/sample_overview.png",
            intro: "The Orthopaedics Department offers comprehensive musculoskeletal care including joint replacement, sports injuries, spine surgery, and trauma management.",
            details: "Our team of orthopaedic surgeons are experienced in handling complex fractures, total knee and hip replacement, arthroscopic procedures, and spinal disorders.",
          },
          {
            name: "Technology & Procedure",
            image: "/images/sample_technologyProcedure.png",
            intro: "Advanced imaging, C-arm fluoroscopy, arthroscopy towers, and modern implants ensure precision in every procedure.",
            details: "",
          },
          {
            name: "Academics & Research",
            image: "/images/sample_academicsResearch.png",
            intro: "Continuous education in orthopaedic advancements and participation in national conferences.",
            details: "",
          },
        ],
        consultants: [
          { name: "Dr. Sample Doctor", tags: ["Orthopaedics"], profilePhoto: "/images/doctors/Male_doctor.png" },
        ],
      },
    ],
  },
  {
    category: "Super Specialty",
    tagline: "Advanced subspecialty care for complex and critical conditions.",
    items: [
      {
        slug: "anaesthesiology",
        title: "Anaesthesiology",
        banner_image: "/images/anaesthesiology_banner.png",
        description: "Perioperative care, pain management, and critical care anaesthesia",
        icon: "syringe",
        tabs: [
          {
            name: "Overview",
            image: "/images/sample_overview.png",
            intro: "The Department of Anaesthesiology provides safe and effective anaesthesia for surgical procedures across all specialties, along with perioperative care, pain management, and ICU support.",
            details: "Our anaesthesiologists work closely with all surgical teams to ensure patient safety before, during, and after procedures.",
          },
          {
            name: "Technology & Procedure",
            image: "/images/sample_technologyProcedure.png",
            intro: "Modern anaesthesia workstations, ultra-sound guided regional blocks, and advanced monitoring systems are used.",
            details: "",
          },
          {
            name: "Academics & Research",
            image: "/images/sample_academicsResearch.png",
            intro: "Active involvement in research on perioperative outcomes and pain management.",
            details: "",
          },
        ],
        consultants: [
          { name: "Dr. Prakash Boir", tags: ["MD Anaesthesia"], profilePhoto: "/images/doctors/Prakash_boir.png" },
        ],
      },
      {
        slug: "ophthalmology",
        title: "Ophthalmology",
        banner_image: "/images/ophthalmology_banner.png",
        description: "Comprehensive eye care including cataract surgery and retinal services",
        icon: "eye",
        tabs: [
          {
            name: "Overview",
            image: "/images/sample_overview.png",
            intro: "Our Ophthalmology department provides comprehensive eye care services including cataract surgeries, glaucoma management, diabetic eye care, and refractive services.",
            details: "Modern phacoemulsification, laser treatments, and vitreo-retinal surgical facilities are available.",
          },
          {
            name: "Technology & Procedure",
            image: "/images/sample_technologyProcedure.png",
            intro: "Equipped with slit lamp, fundus camera, OCT, visual field analyser, and modern phaco machine.",
            details: "",
          },
          {
            name: "Academics & Research",
            image: "/images/sample_academicsResearch.png",
            intro: "Regular eye screening camps in rural areas and research on diabetic retinopathy.",
            details: "",
          },
        ],
        consultants: [
          { name: "Dr. Sample Doctor", tags: ["Ophthalmology"], profilePhoto: "/images/doctors/Male_doctor.png" },
        ],
      },
    ],
  },
  {
    category: "Diagnostic & Support Services",
    tagline: "Precise diagnostics and holistic support for better patient outcomes.",
    items: [
      {
        slug: "dermatology",
        title: "Dermatology",
        banner_image: "/images/dermatology_banner.png",
        description: "Diagnosis and treatment of skin, hair, and nail conditions",
        icon: "user",
        tabs: [
          {
            name: "Overview",
            image: "/images/sample_overview.png",
            intro: "Our Dermatology department manages a wide spectrum of skin diseases, hair disorders, nail problems, and sexually transmitted infections in both adult and paediatric patients.",
            details: "Services include cosmetic dermatology, laser treatments, patch testing, and skin biopsy.",
          },
          {
            name: "Technology & Procedure",
            image: "/images/sample_technologyProcedure.png",
            intro: "Equipped with dermatoscopy, laser for skin conditions, and advanced diagnostic tools for skin conditions.",
            details: "",
          },
          {
            name: "Academics & Research",
            image: "/images/sample_academicsResearch.png",
            intro: "Research in tropical dermatology and participation in dermatology conferences.",
            details: "",
          },
        ],
        consultants: [
          { name: "Dr. Sample Doctor", tags: ["Dermatology"], profilePhoto: "/images/doctors/Male_doctor.png" },
        ],
      },
      {
        slug: "otorhinolaryngology",
        title: "ENT (Otorhinolaryngology)",
        banner_image: "/images/otorhinolaryngology_banner.png",
        description: "Ear, Nose & Throat care including head and neck surgery",
        icon: "ear",
        tabs: [
          {
            name: "Overview",
            image: "/images/sample_overview.png",
            intro: "The ENT department provides comprehensive care for disorders of the ear, nose, throat, and related structures of the head and neck.",
            details: "Services include tonsillectomy, adenoidectomy, sinus surgeries, hearing evaluation, and head-neck procedures.",
          },
          {
            name: "Technology & Procedure",
            image: "/images/sample_technologyProcedure.png",
            intro: "Endoscopic sinus surgery, microscopic ear surgeries, and audiometry are performed using modern equipment.",
            details: "",
          },
          {
            name: "Academics & Research",
            image: "/images/sample_academicsResearch.png",
            intro: "Academic involvement in ENT research and community hearing screening programmes.",
            details: "",
          },
        ],
        consultants: [
          { name: "Dr. Sample Doctor", tags: ["ENT"], profilePhoto: "/images/doctors/Male_doctor.png" },
        ],
      },
    ],
  },
  {
    category: "Future Likely More Clinical Departments",
    tagline: "Expanding our horizons to serve you better.",
    items: [
      {
        slug: "cardiology",
        title: "Cardiology",
        banner_image: "/images/general_hospital_banner.png",
        description: "Advanced cardiac care including interventional cardiology (Planned)",
        icon: "heart",
        tabs: [
          {
            name: "Overview",
            image: "/images/sample_overview.png",
            intro: "Planned expansion of our cardiac services to include full interventional cardiology with catheterization laboratory, echocardiography, and cardiac rehabilitation.",
            details: "",
          },
          { name: "Technology & Procedure", image: "/images/sample_technologyProcedure.png", intro: "", details: "" },
          { name: "Academics & Research", image: "/images/sample_academicsResearch.png", intro: "", details: "" },
        ],
        consultants: [],
      },
    ],
  },
];
