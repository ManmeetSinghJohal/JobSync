"use client";

import React, { useState } from "react";
import Image from "next/image";

import { CompanyLogoProps } from "@/types";

const CompanyLogo = (props: CompanyLogoProps) => {
  const { src, fallbackSrc, alt, width, height, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc || fallbackSrc}
      width={width}
      height={height}
      style={{ objectFit: "cover" }}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default CompanyLogo;
