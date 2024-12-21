import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
interface EmptyResultSectionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const EmptyResultSection: React.FC<EmptyResultSectionProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-auto items-center justify-center px-4 py-8 max-md:px-2"
    >
      <Card className="w-full max-w-lg border-none bg-[#1d2147] text-white">
        <CardContent className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
          {icon && (
            <div className="text-6xl text-gray-400 transition-colors duration-200 hover:text-gray-300">
              {icon}
            </div>
          )}
          <h2 className="text-xl font-semibold tracking-tight text-white max-md:text-lg">
            {title}
          </h2>
          <p className="text-sm text-gray-400 max-md:text-xs">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmptyResultSection;
