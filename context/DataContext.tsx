// context/DataContext.tsx
"use client";
import { SimplifiedPost } from "@/lib";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DataContextProps {
  captions: SimplifiedPost[];
  setCaptions: React.Dispatch<React.SetStateAction<SimplifiedPost[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [captions, setCaptions] = useState<SimplifiedPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <DataContext.Provider
      value={{ captions, loading, setCaptions, setLoading }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
