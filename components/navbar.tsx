"use client";
import { navItems } from "@/constants";
import Link from "next/link";
import { Button } from "./ui/button";
import MobileNav from "./mobile-nav";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDataContext } from "@/context/DataContext";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { logout, getCurrentUser } from "@/lib/appwrite";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const Navbar = () => {
  const { userId, setLoading, setUserId } = useDataContext();
  const router = useRouter();
  const pathName = usePathname();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
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

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const acc = await getCurrentUser();
        console.log(acc);
        setName(acc.firstName);
        setEmail(acc.email);
        setAvatar(acc.avatar);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, []);
  return (
    <Suspense fallback={<>Loading...</>}>
      <nav className="flex h-[90px] items-center justify-between border-b border-gray-600 py-4 shadow-lg  max-md:justify-end max-md:px-5 md:px-[30px] lg:px-[100px]">
        <Link
          href="/"
          className="text-gradient-vertical-green text-2xl font-bold max-lg:hidden "
        >
          My Imaginator
        </Link>

        <div className={`mt-4 hidden md:mt-0  md:flex md:items-center`}>
          {navItems.map((item) => {
            const isActive =
              (pathName?.includes(item.url) && item.url.length > 1) ||
              pathName === item.url;
            return (
              <Link
                key={item.name}
                href={item.url}
                className={`${
                  isActive ? "text-gray-400" : " text-white hover:text-gray-400"
                } rounded-md px-3 py-2 font-medium md:text-xl`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-row items-center max-md:hidden">
          {!userId ? (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-2 text-xl font-medium text-white hover:text-gray-400"
              >
                Login
              </Link>
              <Button
                className="btn-gradient text-base"
                onClick={() => router.push("/caption-generator")}
              >
                Try it Now
              </Button>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={avatar} alt="profile picture" />
                    <AvatarFallback className="cursor-pointer bg-gray-800">
                      U
                    </AvatarFallback>
                  </Avatar>
                </div>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                side="left"
                className="rounded-md border border-gray-600 bg-card p-4 text-black shadow-lg"
              >
                <div className="text-xl font-semibold text-white">{name}</div>
                <div className="text-sm text-gray-400">{email}</div>
                <Button
                  onClick={handleLogout}
                  className="btn-gradient mt-2 w-full text-lg"
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </nav>
    </Suspense>
  );
};

export default Navbar;
