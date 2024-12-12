import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { sections } from "@/constants";

const WhatWeOffer = () => {
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
            <div key={index} className="max-md:flex max-md:justify-center">
              <Card className=" h-[300px] w-full bg-card">
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
                  <h3 className="mb-2 text-start text-lg font-medium text-white">
                    {section.title}
                  </h3>
                  <p className="text-justify  text-lg text-gray-500">
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
