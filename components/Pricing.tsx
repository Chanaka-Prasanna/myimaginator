import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { plans } from "@/constants";
import { Button } from "./ui/button";

// Enterprise plan card details

const Pricing = () => {
  return (
    <section className=" px-4 py-2 sm:px-6 lg:px-8">
      <div className="mb-6 mt-16 text-center">
        <h2 className="section-title">Choose Your Plan</h2>
        <p className="section-description mt-8">
          Affordable pricing for every user
        </p>
      </div>
      <div className="flex flex-row flex-wrap justify-center max-md:space-y-8 md:space-x-[100px] ">
        {plans.map((item, index) => (
          <Card key={item.name} className="flex h-[500px] w-[350px] flex-col">
            <CardHeader>
              <CardTitle
                className={`${
                  index === 0
                    ? ` text-gradient-vertical-blue`
                    : ` text-gradient-vertical-pink`
                } text-3xl`}
              >
                {item.name}
              </CardTitle>
              <CardDescription className="text-xl text-white">
                {item.description}
                <div>
                  <span className="text-base text-gray-400">{item.price}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-5">
                {item.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex flex-row items-center space-x-5 "
                  >
                    <svg
                      className="size-6 shrink-0 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="mt-0 text-lg text-gray-400">{feature}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="btn-gradient w-full cursor-default">
                {item.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
