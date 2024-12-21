"use client";
import ContactUs from "@/components/contact-us";
import HeroBnner from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import Reviews from "@/components/reviews";
import Pricing from "@/components/Pricing";
import WhatWeOffer from "@/components/what-we-offer";
import React, { useEffect } from "react";
import { useDataContext } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeIn}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { setUserId } = useDataContext();
  const router = useRouter();
  useEffect(() => {
    router.push("/");
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }
  }, []);

  return (
    <div>
      <SectionWrapper>
        <HeroBnner />
      </SectionWrapper>
      <SectionWrapper>
        <HowItWorks />
      </SectionWrapper>
      <SectionWrapper>
        <WhatWeOffer />
      </SectionWrapper>
      <div id="pricing">
        <SectionWrapper>
          <Pricing />
        </SectionWrapper>
      </div>
      <div id="contact">
        <SectionWrapper>
          <ContactUs />
        </SectionWrapper>
      </div>
      <SectionWrapper>
        <Reviews />
      </SectionWrapper>
    </div>
  );
};

export default Home;
