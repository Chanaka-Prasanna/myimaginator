import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatTags = (tags: string[]): string => {
  return tags.map((tag) => `${tag}`).join(" ");
};
