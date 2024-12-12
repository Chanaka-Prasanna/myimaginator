import ContactUs from "@/components/contsct-us";
import HeroBnner from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import Reviews from "@/components/reviews";
import Pricing from "@/components/Pricing";
import WhatWeOffer from "@/components/what-we-offer";
import React from "react";
const Home = () => {
  return (
    <div className="">
      <HeroBnner />
      <HowItWorks />
      <WhatWeOffer />
      <Pricing />
      <ContactUs />
      <Reviews />
    </div>
  );
};

export default Home;
