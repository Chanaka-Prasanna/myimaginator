import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeroBanner = () => {
  const router = useRouter();

  return (
    <section className="relative flex h-auto w-full flex-col-reverse px-4 pt-10 max-md:pb-10 md:flex-row md:px-[60px] ">
      {/* Text Content Section */}
      <div className="z-10 w-full md:w-1/2 md:px-10 lg:pr-20">
        <h3 className="text-gradient-vertical-pink text-center text-sm font-bold md:text-left">
          Media Manager
        </h3>
        <h1 className="text-gradient-vertical-blue-reverse my-4 text-center text-4xl font-bold md:text-left md:text-5xl lg:text-6xl">
          Generate Personalized Captions in Seconds!
        </h1>
        <p className="mb-8 mt-6 text-center text-base md:text-left md:text-lg">
          Our website helps you generate engaging, AI-powered captions tailored
          for your social media posts in just seconds. Whether you&#39;re
          looking to boost engagement, save time, or enhance your creativity,
          our tool is designed to make caption creation effortless and
          effective. Perfect for influencers, marketers, or anyone wanting their
          posts to stand out!
        </p>
        <div className="flex flex-row items-center justify-center space-x-4 md:justify-start">
          <Button
            onClick={() => router.push("/caption-generator")}
            className="btn-gradient h-[40px] w-[120px] px-4 py-2 text-lg font-bold"
          >
            Try it Now
          </Button>
          <Button
            className="btn-gray h-[40px] w-[140px] px-4 py-2 text-lg font-bold"
            onClick={() => router.push("#pricing")}
          >
            View Pricing
          </Button>
        </div>
      </div>
      {/* Image Section - First in mobile, last in desktop */}
      <div className="flex w-full items-center justify-center md:absolute md:right-10 md:w-1/2 lg:right-5">
        <Image
          className="w-full max-w-[350px] object-contain md:max-w-[400px] lg:max-w-[500px]"
          alt="hero image"
          height={500}
          width={500}
          src="/hero-bg.png"
        />
      </div>
    </section>
  );
};

export default HeroBanner;
