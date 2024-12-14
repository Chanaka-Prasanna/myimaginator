"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Import shadcn components
import { steps } from "@/constants";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="mt-16 h-auto">
      <div className="mx-auto  max-w-6xl px-4 text-center">
        <h2 className="section-title">How It Works</h2>
        <p className="section-description mb-6 mt-8  ">
          Simple, fast, and hassle-free.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
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
                <CardHeader className="flex flex-col items-center space-y-2">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gray-100 p-3 text-gray-700">
                    <step.icon size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    {step.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-500">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
