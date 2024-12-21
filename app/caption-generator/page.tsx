"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { IoCopyOutline, IoShareSocialOutline } from "react-icons/io5";
import SharedCaptions from "@/components/shared/shared-captions";
import { getAllCaptions, shareCaption } from "@/lib/appwrite";
import { useDataContext } from "@/context/DataContext";
import LoadingSpinner from "@/components/shared/loading";
import { IconUpload } from "@tabler/icons-react";
import { formatTags, cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { captionTones } from "@/constants";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const CaptionGenerator = () => {
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState<string[]>(["uni", "love", "freedom"]);
  const [topic, setTopic] = useState("Test Topic");
  const { setCaptions, loading, setLoading } = useDataContext();
  const router = useRouter();

  // files
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);

  const resetForm = () => {
    setDescription("");
    setTone("");
    setCaption("");
  };

  const generateCaption = async () => {
    if (!description) {
      alert("Please enter a description.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          tone,
          file: imagePreview,
          imageMimeType,
        }),
      });
      const data = await response.json();

      const extractedJson = data.message.match(/```json\n([\s\S]*?)\n```/);

      if (extractedJson) {
        const parsedData = JSON.parse(extractedJson[1]);

        setCaption(parsedData.caption);
        setTags(parsedData.tags);
        setTopic(parsedData.topic);

        console.log(parsedData.topic);
      } else {
        console.error("Failed to extract JSON.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const share = async () => {
    const userId = localStorage.getItem("userId");
    if (userId === "" || !userId) {
      return router.push("/login");
    }
    try {
      setLoading(true);
      await shareCaption(topic, tone, tags, caption);
      const result = await getAllCaptions();
      setCaptions(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // for file uploading
  const handleFileChange = (newFiles: File[]) => {
    if (newFiles.length > 0 && newFiles[0].type.startsWith("image/")) {
      const newFile = newFiles[0]; // Only take the first image
      setFile(newFile);

      // Create a FileReader to read the file as base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // This is the base64 string
        setImagePreview(base64String); // Update the preview with the base64 string
        setImageMimeType(newFile.type);
      };
      reader.readAsDataURL(newFile);
    } else {
      console.log("Only image files are allowed.");
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    accept: {
      "image/webp": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        setLoading(true);
        const result = await getAllCaptions();
        setCaptions(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCaptions();
  }, []);
  return (
    <div>
      <section className="flex h-auto flex-col items-center justify-center px-4 pt-5 max-md:h-screen max-md:px-2">
        <Card className="w-full max-w-3xl border-none bg-[#1d2147] text-white">
          <CardHeader className="text-center">
            <h2 className="text-lg font-semibold max-md:text-base">
              Caption Generator
            </h2>
          </CardHeader>
          <CardContent>
            {!caption ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3 max-md:space-y-4"
              >
                {/* File Upload */}
                <div className="flex flex-col items-center justify-center">
                  <div
                    className="flex w-full max-w-sm items-center justify-center max-md:max-w-full"
                    {...getRootProps()}
                  >
                    <motion.div
                      onClick={handleClick}
                      whileHover="animate"
                      className="group/file relative block w-1/2 cursor-pointer overflow-hidden rounded-lg p-10"
                    >
                      <input
                        ref={fileInputRef}
                        id="file-upload-handle"
                        type="file"
                        accept="image/*" // Restrict to image files only
                        onChange={(e) =>
                          handleFileChange(Array.from(e.target.files || []))
                        }
                        className="hidden"
                      />

                      <div className="flex flex-col items-center justify-center">
                        <div className="relative mx-auto mt-10 w-full max-w-xl">
                          {imagePreview && (
                            <div className="mt-1 flex w-full justify-center">
                              <Image
                                src={imagePreview}
                                alt="Image Preview"
                                layout="responsive" // Ensures image takes full width while maintaining aspect ratio
                                width={100} // This is a placeholder for the aspect ratio
                                height={100} // This should be the same aspect ratio as your image
                                className="h-auto w-full rounded-md object-contain shadow-md"
                              />
                            </div>
                          )}
                          {!file && (
                            <motion.div
                              layoutId="file-upload"
                              variants={mainVariant}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                              className={cn(
                                "relative group-hover/file:shadow-2xl bg-[#70759b] z-40 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                                "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                              )}
                            >
                              {isDragActive ? (
                                <motion.p
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="flex flex-col items-center text-neutral-600"
                                >
                                  Drop it
                                  <IconUpload className="size-4 text-white " />
                                </motion.p>
                              ) : (
                                <IconUpload className="size-4 text-white " />
                              )}
                            </motion.div>
                          )}

                          {!file && (
                            <motion.div
                              variants={secondaryVariant}
                              className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent opacity-0"
                            ></motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Description Input */}
                <Textarea
                  rows={5}
                  placeholder="Describe your post (e.g., A sunset on the beach)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-[#1d2147] text-white placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500 max-md:text-sm"
                />

                {/* Tone Selection */}
                <select
                  className="w-full rounded-lg border  border-gray-600 bg-[#1d2147] p-2 text-gray-300 focus:ring-2 focus:ring-blue-500 max-md:text-sm"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  {captionTones.map((tone, i) => (
                    <option key={i} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>

                {/* Generate Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={generateCaption}
                    disabled={!description || !tone}
                    className="btn-gradient w-[150px] max-md:w-full max-md:text-sm"
                  >
                    Generate Caption
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4  max-md:space-y-3"
              >
                <p className="text-sm text-gray-100 max-md:text-xs">
                  Your Caption
                </p>
                <blockquote className="relative rounded-lg bg-gray-700 p-4 italic text-gray-400 max-md:p-3 max-md:text-sm">
                  {caption}
                  <span className="mt-2 block text-xs font-light text-gray-400">
                    {formatTags(tags)}
                  </span>
                  <IoCopyOutline
                    size={20}
                    className="absolute right-2 top-2 cursor-pointer text-white hover:text-blue-500"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(`${caption}\n\n${formatTags(tags)}`)
                        .then(() => {
                          alert("Caption copied to clipboard!");
                        })
                        .catch(() => {
                          alert("Failed to copy caption. Please try again.");
                        });
                    }}
                  />
                  <IoShareSocialOutline
                    onClick={share}
                    size={20}
                    className="absolute right-8 top-2 cursor-pointer text-white hover:text-text_secondary"
                  />
                </blockquote>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={resetForm}
                    className="btn-gradient w-[150px] max-md:w-full max-md:text-sm"
                  >
                    Generate Another
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
        <div className="w-full">
          <SharedCaptions />
        </div>
      </section>

      {loading && <LoadingSpinner isLoading={loading} />}
    </div>
  );
};

export default CaptionGenerator;
