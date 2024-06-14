"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import ThemeSwitch from "./ThemeSwitch";
import { pageLinks } from "@/constants";
import MobileNavigation from "@/components/Navbar/MobileNavigation";

import { cn } from "@/lib/utils";
import Logo from "../shared/Logo";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed z-40 mx-auto h-[4.375rem]  w-full border-b border-natural-5 bg-white  dark:border-darkBg-3 dark:bg-darkBg-1">
      <nav className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-5 xl:px-0 ">
        <Link href="/">
          <Logo />
        </Link>
        <div className="hidden w-full justify-center md:flex">
          <ul className="flex space-x-6 text-base font-medium leading-6">
            {pageLinks.map(({ href, label }) => (
              <Link href={href} key={href} className="flex items-center">
                <li
                  className={cn(
                    pathname === href
                      ? "flex items-center border-b border-primary text-primary"
                      : "text-natural-6"
                  )}
                >
                  {label}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="hidden justify-end md:flex md:w-40">
          <ThemeSwitch />
        </div>
        <div className="flex w-full justify-end md:hidden">
          <MobileNavigation />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
