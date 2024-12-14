"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileUpload } from "@/components/ui/file-upload";
import { Textarea } from "@/components/ui/textarea";
import { IoCopyOutline, IoShareSocialOutline } from "react-icons/io5";
import SharedCaptions from "@/components/shared/shared-captions";
import { getAllCaptions, shareCaption } from "@/lib/appwrite";
import { useDataContext } from "@/context/DataContext";
import LoadingSpinner from "@/components/shared/loading";

const CaptionGenerator = () => {
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("");
  const [caption, setCaption] = useState(null);
  const { setCaptions, loading, setLoading } = useDataContext();

  const handleGenerate = () => {
    setTimeout(() => {
      setCaption(`Your AI-generated caption with a ${tone} tone.`);
    }, 1000);
  };

  const resetForm = () => {
    setDescription("");
    setTone("");
    setCaption(null);
  };

  const share = async () => {
    try {
      await shareCaption();
    } catch (error) {
      console.log(error);
    }
  };

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
      {!loading && (
        <section className="flex h-auto flex-col items-center justify-center px-8 pt-5 max-md:h-screen max-md:px-2">
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
                    <FileUpload />
                  </div>

                  {/* Description Input */}
                  <Textarea
                    rows={5}
                    placeholder="Describe your post (e.g., A sunset on the beach)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-lg border border-gray-600 bg-[#1d2147] text-white focus:ring-2 focus:ring-blue-500 max-md:text-sm"
                  />

                  {/* Tone Selection */}
                  <select
                    className="w-full rounded-lg border border-gray-600 bg-[#1d2147] p-2 text-white focus:ring-2 focus:ring-blue-500 max-md:text-sm"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    <option value="">Select tone</option>
                    <option value="funny">Funny</option>
                    <option value="inspirational">Inspirational</option>
                    <option value="professional">Professional</option>
                  </select>

                  {/* Generate Button */}
                  <div className="flex justify-center">
                    <Button
                      onClick={handleGenerate}
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
                  className="space-y-4 text-center max-md:space-y-3"
                >
                  <p className="text-sm text-gray-300 max-md:text-xs">
                    Your Caption:
                  </p>
                  <blockquote className=" rounded-lg bg-gray-700 p-4 italic max-md:p-3 max-md:text-sm">
                    {caption}
                    <IoCopyOutline
                      className=" right-2 top-2 cursor-pointer text-white hover:text-blue-500"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(caption)
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
                      className="cursor-pointer text-white hover:text-blue-500"
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
          <SharedCaptions />
        </section>
      )}

      {loading && <LoadingSpinner isLoading={loading} />}
    </div>
  );
};

export default CaptionGenerator;
