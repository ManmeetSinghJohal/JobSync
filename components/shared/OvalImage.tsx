import React from "react";
import Image, { ImageProps } from "next/image";
import oval from "@/public/assets/icons/oval-gray.svg";

const OvalImage = ({ className,  ...props }:  Partial< ImageProps >) => {
  return (
    <Image
      {...props}
      src={oval}
      alt="oval"
      width={5}
      height={5}
      className={`mx-2 ${className}`}
    />
  );
};

export default OvalImage;
