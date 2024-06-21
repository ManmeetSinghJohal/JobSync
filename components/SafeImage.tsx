"use client";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  defaultSrc: string;
}

const SafeImage = ({
  src,
  alt,
  width,
  height,
  className,
  defaultSrc,
}: SafeImageProps) => {
  return (
    <Image
      src={src || defaultSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={(event) => {
        event.currentTarget.src = defaultSrc;
      }}
      unoptimized={true}
    />
  );
};

export default SafeImage;
