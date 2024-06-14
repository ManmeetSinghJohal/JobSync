import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { pageLinks } from "@/constants";
import ThemeSwitch from "./ThemeSwitch";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex min-h-screen items-center">
      <div className="flex w-[256px] flex-col gap-6">
        {pageLinks.map((link) => {
          const isActive =
            (pathname.includes(link.href) && link.href.length > 1) ||
            pathname === link.href;

          return (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className={`${
                  isActive
                    ? "w-full rounded-lg bg-natural-1 font-bold text-primary dark:bg-darkBg-3  "
                    : "text-[16px] font-normal text-natural-7 dark:text-natural-6"
                } py-3 pl-4 `}
              >
                <p className={`${isActive ? "" : ""}`}>{link.label}</p>
              </Link>
            </SheetClose>
          );
        })}
        <div className=" py-3 pl-4">
          <ThemeSwitch />
        </div>
      </div>
    </section>
  );
};

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="menu"
          className="md:hidden"
        />
      </SheetTrigger>
      <SheetContent side="right" className="bg-white dark:bg-darkBg-1">
        <div className="flex flex-col  gap-3">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
