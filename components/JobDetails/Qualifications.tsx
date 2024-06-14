import React from "react";
import Image from "next/image";

const Qualifications = ({ item }: any) => {
  return (
    <div className="my-1.5 flex items-start font-manrop" key={item}>
      <Image
        src="/assets/icons/Oval.svg"
        width={8}
        height={8}
        alt="oval-icon"
        className="mr-[10px] mt-1"
      />
      <p className="font-manrop text-base font-light tracking-wide text-natural-7 dark:text-natural-5">
        {item}
      </p>
    </div>
  );
};

export default Qualifications;
