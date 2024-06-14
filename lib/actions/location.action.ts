"use server";

import { headers } from "next/headers";

export const getUserLocation = async () => {
  const headersList = headers();
  const userLocation = "";
  const env = process.env.NODE_ENV;

  if (env === "development") {
    const userIPAddress = "31.226.194.205";
    const url = `http://ip-api.com/json/${userIPAddress}`;
    try {
      const response = await fetch(url);
      let userLocation = await response.json();

      if (userLocation === null) {
        userLocation = "United States";
      }

      return userLocation;
    } catch (error) {
      console.error(error);
    }
  }

  if (env === "production") {
    if (headersList.get("X-FORWARDED-FOR")) {
      const userIPAddress = headersList.get("x-forwarded-for");

      const url = `http://ip-api.com/json/${userIPAddress}`;
      try {
        const response = await fetch(url);
        let userLocation = await response.json();

        if (userLocation === null) {
          userLocation = "United States";
        }

        return userLocation;
      } catch (error) {
        console.error(error);
      }
    }
    console.log("No IP address found");
  }
  return userLocation;
};
