import type { Blog } from "@/types";
import highTibialOsteotomy from "./high-tibial-osteotomy";
import prostatomegalyEnlargedProstate from "./prostatomegaly-enlarged-prostate";
import urethralStrictureDisease from "./urethral-stricture-disease";

// Full articles — each maintained in its own file above. To add a new blog,
// create a new file next to these (copy one as a template) and list it here.
const posts: Blog[] = [
  highTibialOsteotomy,
  prostatomegalyEnlargedProstate,
  urethralStrictureDisease,
];

// Placeholder entries awaiting real content — kept inline since they carry no
// article body. Once written up, promote each into its own file like the
// three above and remove it from this list.
const placeholders: Blog[] = [
  {
    id: 2,
    title: "comming soon",
    category: "Hospital News",
    image: "/images/health-and-wellness/image2.jpg",
    link: "",
    date: "2025-03-20",
    excerpt: "comming soon",
    author: "Hospital Communications",
  },
  {
    id: 3,
    title: "comming soon",
    category: "Infrastructure Update",
    image: "/images/health-and-wellness/image3.jpg",
    link: "",
    date: "2025-03-01",
    excerpt: "comming soon",
    author: "Hospital Communications",
  },
  {
    id: 4,
    title: "comming soon",
    category: "Health Camp",
    image: "/images/health-and-wellness/image4.jpg",
    link: "",
    date: "2025-05-05",
    excerpt: "comming soon",
    author: "Cardiology Department",
  },
  {
    id: 5,
    title: "comming soon",
    category: "Quality & Safety",
    image: "/images/health-and-wellness/image5.jpg",
    link: "",
    date: "2025-02-15",
    excerpt: "SVKM's TMPM Hospital has received NABH accreditation, affirming our commitment to patient safety, quality care, and international healthcare standards.",
    author: "Quality Team",
  },
  {
    id: 6,
    title: "comming soon",
    category: "Community Event",
    image: "/images/health-and-wellness/image6.jpg",
    link: "",
    date: "2025-01-26",
    excerpt: "comming soon",
    author: "Hospital Communications",
  },
];

export const blogPosts: Blog[] = [...posts, ...placeholders];
