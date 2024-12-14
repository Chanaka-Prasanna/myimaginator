"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IoHeartOutline, IoHeart, IoCopyOutline } from "react-icons/io5";

// Define types for caption data
interface Caption {
  id: number;
  name: string;
  profilePic: string;
  title: string;
  tone: string;
  caption: string;
  hashtags: string;
  upvotes: number;
  isUpvoted: boolean;
}

const SharedCaptions: React.FC = () => {
  const [captions, setCaptions] = useState<Caption[]>([
    {
      id: 1,
      name: "John Doe",
      profilePic: "https://via.placeholder.com/40",
      title: "Traveling",
      tone: "Inspirational",
      caption:
        "Exploring the world, one step at a time.Exploring the world, one step at a time.Exploring the world, one step at a time.Exploring the world, one step at a time.Exploring the world, one step at a time.Exploring the world, one step at a time. 🌍 🌍",
      hashtags: "#Travel #Adventure #Explore",
      upvotes: 0,
      isUpvoted: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic: "https://via.placeholder.com/40",
      title: "Education",
      tone: "Professional",
      caption: "Knowledge is power. Keep learning! 📚",
      hashtags: "#Education #Growth #Inspiration",
      upvotes: 5,
      isUpvoted: true,
    },
  ]);

  // Handle upvote toggle
  const handleUpvote = (id: number) => {
    setCaptions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              upvotes: item.isUpvoted ? item.upvotes - 1 : item.upvotes + 1,
              isUpvoted: !item.isUpvoted,
            }
          : item
      )
    );
  };

  // Handle copy to clipboard
  const handleCopy = (caption: string, hashtags: string) => {
    const textToCopy = `${caption} ${hashtags}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => alert("Caption and hashtags copied to clipboard!"))
      .catch(() => alert("Failed to copy. Please try again."));
  };

  return (
    <div className="space-y-6 p-4 ">
      <h3 className="text-center text-xl font-semibold text-white">
        Shared Captions by Others
      </h3>
      <div className="grid grid-cols-1 gap-x-8  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {captions.map((item) => (
          <Card
            key={item.id}
            className="flex w-auto flex-col justify-between border border-gray-600 bg-card text-white"
          >
            <CardHeader className="flex flex-row items-center space-x-4">
              <img
                src={item.profilePic}
                alt={`${item.name}'s profile`}
                className="size-15 rounded-full"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">{item.title}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Caption and Hashtags */}
              <blockquote className="relative rounded-lg bg-gray-700 p-4 text-sm italic max-md:p-3">
                {item.caption}
                <span className="mt-2 block text-xs font-light text-gray-400">
                  {item.hashtags}
                </span>
                <IoCopyOutline
                  className="absolute right-2 top-2 cursor-pointer text-white hover:text-blue-500"
                  onClick={() => handleCopy(item.caption, item.hashtags)}
                />
              </blockquote>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              {/* Tone and Action Section */}

              <p className="text-xs text-gray-400">Tone: {item.tone}</p>
              <button
                onClick={() => handleUpvote(item.id)}
                className="flex items-center space-x-1 text-pink-500 hover:text-pink-600"
              >
                {item.isUpvoted ? <IoHeart /> : <IoHeartOutline />}
                <span>{item.upvotes}</span>
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SharedCaptions;
