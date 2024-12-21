import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatTags = (tags: string[]): string => {
  return tags.map((tag) => `${tag}`).join(" ");
};

export const handleScrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth",
    });
  }
};
