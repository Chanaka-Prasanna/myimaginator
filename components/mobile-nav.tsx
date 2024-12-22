"use client";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";

import { navItems } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/appwrite";
import { useDataContext } from "@/context/DataContext";

const NavContent = () => {
  const { setLoading, setUserId } = useDataContext();
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("userId");
      setUserId("");
      await logout();
      router.replace("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex h-full flex-col gap-6   pt-16">
      {navItems.map((item) => {
        const isActive =
          (pathName?.includes(item.url) && item.url.length > 1) ||
          pathName === item.url;
        return (
          <SheetClose asChild key={item.url}>
            <Link
              href={item.url}
              className={`${
                isActive ? "text-gray-400" : " text-white hover:text-gray-400"
              } flex items-center justify-start gap-4 p-4`}
            >
              {/* <Image
                src={item.imgURL}
                width={20}
                height={20}
                alt={item.label}
                className={`${isActive ? "" : "invert-colors"}`}
              /> */}
              <p
                className={`${
                  isActive
                    ? "font-bold text-white"
                    : "font-medium text-gray-400  hover:text-white"
                }`}
              >
                {item.name}
              </p>
            </Link>
          </SheetClose>
        );
      })}

      {localStorage.getItem("userId") && (
        <span className="pl-4">
          <AiOutlineLogout
            size={30}
            onClick={handleLogout}
            className="text-red-600"
          />
        </span>
      )}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <svg
          className="size-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </SheetTrigger>
      <SheetContent side="left" className="border-none bg-card">
        <Link
          href="/"
          className="text-gradient-vertical-green flex items-center gap-1 text-2xl font-bold "
        >
          My Imaginator
        </Link>

        <div>
          <SheetClose asChild>
            <div>
              <NavContent />
            </div>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
