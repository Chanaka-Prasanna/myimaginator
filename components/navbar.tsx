"use client";
import { navItems } from "@/constants";
import Link from "next/link";
import { Button } from "./ui/button";
import MobileNav from "./mobile-nav";

const Navbar = () => {
  return (
    <nav className="flex h-[90px] items-center justify-between border-b border-gray-600  py-4 shadow-lg md:px-[100px]">
      <Link
        href="/"
        className="text-gradient-vertical-blue text-2xl font-bold "
      >
        My Imaginator
      </Link>

      <div className={`mt-4 hidden md:mt-0  md:flex md:items-center`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.url}
            className="rounded-md px-3 py-2 text-xl font-medium text-white hover:text-gray-400"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="max-md:hidden">
        <Link
          href="/home"
          className="rounded-md px-3 py-2  text-xl font-medium text-white hover:text-gray-400"
        >
          Login
        </Link>

        <Button className="btn-gradient text-lg">Try Demo</Button>
      </div>

      <div className="md:hidden">
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
