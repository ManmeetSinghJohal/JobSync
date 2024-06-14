"use client";

import { useState, useEffect } from "react";

import { getRandomInt } from "@/lib/utils";

const useRandomNumber = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setNumber(getRandomInt(0, 1000));
    const randomInterval = getRandomInt(1, 5) * 10000;

    const interval = setInterval(() => {
      setNumber((prevNumber) => {
        if (prevNumber >= 1000) {
          clearInterval(interval);

          return getRandomInt(0, 1000);
        }

        return prevNumber + 1;
      });
    }, randomInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return number;
};

export default useRandomNumber;
