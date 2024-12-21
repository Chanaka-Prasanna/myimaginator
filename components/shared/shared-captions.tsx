"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IoHeartOutline, IoHeart, IoCopyOutline } from "react-icons/io5";
import { getAllCaptions, like } from "@/lib/appwrite";
import EmptyResultSection from "./empty-resut";
import { useDataContext } from "@/context/DataContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatTags } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AiOutlineFile } from "react-icons/ai";

const SharedCaptions: React.FC = () => {
  const { captions, loading, setLoading, setCaptions } = useDataContext();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleUpvote = async (captionId: string, currentLikes: number) => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId === "" || !userId) {
        return router.push("/login");
      }
      setLoading(true);
      await like(captionId, currentLikes);
      const result = await getAllCaptions();
      setCaptions(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle copy to clipboard
  const handleCopy = (caption: string, hashtags: string) => {
    const textToCopy = `${caption} \n \n${hashtags}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => alert("Caption and hashtags copied to clipboard!"))
      .catch(() => alert("Failed to copy. Please try again."));
  };

  return (
    <div className="space-y-6 p-4 max-md:py-2">
      <h3 className="section-title max-md:text-gradient-vertical-green-reverse py-4 text-center font-semibold max-md:py-2">
        Shared Captions by Others
      </h3>
      <p className="section-description mb-6 text-center  ">
        Select a caption and mark it as liked
      </p>
      <div className="grid  grid-cols-1 gap-x-8 gap-y-2  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {captions.length > 0 &&
          captions.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative  block h-auto w-full p-2"
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className="absolute inset-0 block h-auto w-full rounded-2xl bg-[#70759b] dark:bg-slate-800/[0.8]"
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
              <Card className="relative  z-20 flex w-auto flex-col justify-between border border-transparent bg-card text-white">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={item.user.avatar} alt="prifile picture" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{item.user.name}</p>
                    <p className="text-sm text-gray-400">{item.topic}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Caption and Hashtags */}
                  <blockquote className="relative rounded-lg bg-gray-700 p-4 text-sm italic max-md:p-3">
                    {item.caption}

                    <span className="mt-2 block text-xs font-light text-gray-400">
                      {formatTags(item.tags)}
                    </span>

                    <IoCopyOutline
                      className="absolute right-2 top-2 cursor-pointer text-white hover:text-blue-500"
                      onClick={() =>
                        handleCopy(item.caption, formatTags(item.tags))
                      }
                    />
                  </blockquote>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  {/* Tone and Action Section */}

                  <p className="text-xs text-gray-400">Tone: {item.tone}</p>
                  <button
                    onClick={() => handleUpvote(item.id, item.likes)}
                    className="flex items-center space-x-1 text-pink-500 hover:text-pink-600"
                  >
                    {item.user.isLiked ? <IoHeart /> : <IoHeartOutline />}
                    <span>{item.likes}</span>
                  </button>
                </CardFooter>
              </Card>
            </div>
          ))}
      </div>
      {captions.length === 0 && !loading && (
        <EmptyResultSection
          title="No Captions Found"
          description="Be the first to create a caption and share!"
          icon={<AiOutlineFile />}
        />
      )}
    </div>
  );
};

export default SharedCaptions;
