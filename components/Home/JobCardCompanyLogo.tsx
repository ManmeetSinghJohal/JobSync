"use client";

import React, { useState } from "react";
import Image from "next/image";

import { JobCardCompanyLogoProps } from "@/types";

const JobCardCompanyLogo = (props: JobCardCompanyLogoProps) => {
  const { src, fallbackSrc, alt, width, height, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc || fallbackSrc}
      width={width}
      height={height}
      style={{ objectFit: "contain" }}
      priority
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default JobCardCompanyLogo;
