"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { sections } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";

const WhatWeOffer = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="mx-auto  mt-16 max-w-6xl px-4 text-center">
      {/* Trusted by Section */}
      {/* <div className="text-center">
          <h2 className="text-2xl font-bold">Trusted by</h2>
          <p className="mt-2 text-lg ">
            They work to find cures to cancer, travel to space, build
            tomorrow&lsquo;s innovations, and beyond.
          </p>
          <div className="mt-8 flex justify-center space-x-6">
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={`/images/logos/${logo}`}
                alt={logo.split(".")[0]}
                width={50}
                height={50}
                className="object-contain"
              />
            ))}
          </div>
        </div> */}

      {/* What We Offer Section */}
      <div className=" text-center">
        <h2 className="section-title">What We Offer</h2>
        <p className="section-description mb-8 mt-10 ">
          Brands can directly contact well known influencers, however they might
          miss rising stars in their discovery process or get lost among the
          thousands of messages influencers receive.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <div
              key={index}
              // className="max-md:flex max-md:justify-center"
              className="group relative  block size-full p-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className="absolute inset-0 block size-full rounded-2xl bg-[#70759b] dark:bg-slate-800/[0.8]"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <Card className=" relative z-20 h-[300px] w-full overflow-hidden border border-transparent bg-card">
                <CardHeader className="mb-6 flex  space-y-2 text-white">
                  <div className=" flex size-16 items-center justify-center  rounded-full border-2 ">
                    <Image
                      width={40}
                      height={40}
                      src={section.icon}
                      alt="Earth"
                    />
                  </div>
                </CardHeader>
                <CardContent className=" justify-start ">
                  <h3 className="mb-2 text-start text-lg font-medium text-white max-md:text-base">
                    {section.title}
                  </h3>
                  <p className="text-justify text-lg  text-gray-500 max-md:text-base">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
