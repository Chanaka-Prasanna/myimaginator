import { IoCloudUploadOutline, IoShareSocialOutline } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { icons } from "./icons";

export const navItems = [
  { name: "Home", url: "/" },
  { name: "Generate", url: "/caption-generator" },
  { name: "Captions", url: "/captions" },
  { name: "Pricing", url: "#pricing" },
  { name: "Contact", url: "#contact" },
];

export const plans = [
  {
    name: "FREE",
    description: "Basic tools for individuals",
    price: "$0",
    features: [
      "Limited Tones",
      "No Customization",
      "Basic Customer Support",
      "AI Processing",
    ],
    buttonText: "Current Plan",
  },
  {
    name: "PREMIUM",
    description: "Essential tools for individuals",
    price: "Coming Soon",
    pricePerMonth: "/ per month",
    features: [
      "All Tones",
      "Full Customization",
      "Customer Support",
      "Access to Dashboard",
      "Post Performance Tips",
    ],
    buttonText: "Coming Soon",
  },
];

export const steps = [
  {
    icon: IoCloudUploadOutline,
    title: "Upload your Image or Describe Your Post",
    description:
      "Option to upload a photo or describe the post you want to share.",
  },
  {
    icon: FaRegSmile,
    title: "Select Your Mood/Tone",
    description:
      "Choose from a variety of tones like funny, professional, or casual.",
  },
  {
    icon: BsRobot,
    title: "Generate Captions",
    description:
      "Let AI do the magic and suggest creative captions tailored to your post.",
  },
  {
    icon: MdModeEdit,
    title: "Choose & Customize",
    description: "Pick the best caption or tweak it to fit your unique style.",
  },
  {
    icon: IoShareSocialOutline,
    title: "Share on Social Media",
    description:
      "Directly share to platforms like Facebook, Instagram, or LinkedIn.",
  },
];

export const sections = [
  {
    title: "MyImaginator is Global and 24/7",
    icon: icons.earth,
    description:
      "Any brand can publish their campaign and any influencer that meets their requirements can join them.",
  },
  {
    title: "Optimizes Trends and Discovery",
    icon: icons.rocket,
    description:
      "We analyze and showcase emerging content patterns, highlighting opportunities that align with your target audience.",
  },
  {
    title: "Lifestyle Matchmaking",
    icon: icons.life,
    description:
      "Our state-of-the-art visual semantic search AI algorithms can find influencers with any lifestyle or ethos desired by the brand.",
  },
];

export const captionTones = [
  "Casual",
  "Professional",
  "Inspirational",
  "Humorous",
  "Sarcastic",
  "Emotional",
  "Bold",
  "Mysterious",
  "Romantic",
  "Minimalist",
  "Trendy",
  "Descriptive",
  "Luxury",
  "Call to Action",
  "Reflective",
];
