"use client";
import LoadingSpinner from "@/components/shared/loading";
import SharedCaptions from "@/components/shared/shared-captions";
import { useDataContext } from "@/context/DataContext";
import { getAllCaptions } from "@/lib/appwrite";
import React, { useEffect } from "react";

const Captions = () => {
  const { loading, captions, setCaptions, setLoading } = useDataContext();

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
    if (captions.length === 0) fetchCaptions();
  }, []);

  return (
    <div className="mt-5 px-10 max-md:mt-0 max-md:px-0">
      <SharedCaptions />
      {loading && <LoadingSpinner isLoading={loading} />}
    </div>
  );
};

export default Captions;
