"use client";

import React, { useState } from "react";
import Image from "next/image";

import { InlineJobCardCompanyLogoProps } from "@/types";

const InlineJobCardCompanyLogo = (props: InlineJobCardCompanyLogoProps) => {
  const { src, fallbackSrc, alt, width, height, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc || fallbackSrc}
      width={width}
      height={height}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default InlineJobCardCompanyLogo;
