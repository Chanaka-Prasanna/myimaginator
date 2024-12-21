// context/DataContext.tsx
"use client";
import { SimplifiedPost } from "@/lib";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DataContextProps {
  captions: SimplifiedPost[];
  loading: boolean;
  userId: string;
  setCaptions: React.Dispatch<React.SetStateAction<SimplifiedPost[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [captions, setCaptions] = useState<SimplifiedPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  return (
    <DataContext.Provider
      value={{ captions, loading, userId, setCaptions, setLoading, setUserId }}
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
