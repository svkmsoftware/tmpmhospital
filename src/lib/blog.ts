import { doctors } from "@/data/doctors";
import type { Blog } from "@/types";

export interface BlogAuthorInfo {
  name: string;
  designation?: string;
  photo?: string;
}

// Resolves the byline for a blog: when `authorId` points to a real doctor
// (see doctors.ts), their name/designation/photo are pulled in automatically
// so hero banners and author cards never need to be hand-built per article.
// Falls back to the plain `author` label when no doctor is linked.
export function getBlogAuthorInfo(blog: Blog): BlogAuthorInfo {
  if (blog.authorId != null) {
    const doctor = doctors.find((d) => d.id === blog.authorId);
    if (doctor) {
      return {
        name: doctor.name,
        designation: doctor.tags?.[0],
        photo: doctor.profilePhoto,
      };
    }
  }
  return { name: blog.author };
}
