"use client";

import React, { useEffect, useState } from "react";

import { useTheme } from "@/contexts/ThemeProvider";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

const ThemeSwitch = () => {
  const { mode, setMode } = useTheme();
  const [isChecked, setIsChecked] = useState(mode === "dark");

  const toggleSwitch = (checkedState: boolean) => {
    setIsChecked(checkedState);
    if (checkedState) {
      setMode("dark");
      localStorage.setItem("mode", "dark");
    } else {
      setMode("light");
      localStorage.setItem("mode", "light");
    }
  };

  useEffect(() => {
    setIsChecked(mode === "dark");
  }, [mode]);

  return (
    <div className="flex items-center space-x-3">
      <Image
        src="/assets/icons/sun.svg"
        alt="sun_icon"
        height={24}
        width={24}
        loading="eager"
      />

      <Switch
        className="bg-primary"
        checked={isChecked}
        onCheckedChange={toggleSwitch}
      />

      <Image
        src="/assets/icons/moon.svg"
        alt="moon_icon"
        height={24}
        width={24}
        loading="eager"
      />
    </div>
  );
};

export default ThemeSwitch;
