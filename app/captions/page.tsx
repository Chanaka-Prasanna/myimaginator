"use client";
import LoadingSpinner from "@/components/shared/loading";
import SharedCaptions from "@/components/shared/shared-captions";
import { useDataContext } from "@/context/DataContext";
import { getAllCaptions } from "@/lib/appwrite";
import React, { useEffect } from "react";

const Captions = () => {
  const { setCaptions, loading, setLoading } = useDataContext();

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
    <div className="mt-5 px-10">
      {!loading && <SharedCaptions />}
      {loading && <LoadingSpinner isLoading={loading} />}
    </div>
  );
};

export default Captions;
