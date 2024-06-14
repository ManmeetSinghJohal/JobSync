import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonLoader = ({
  className,
  numRows,
}: {
  className: string;
  numRows: number;
}) => {
  return (
    <div className="flex w-full flex-col gap-y-12">
      {numRows &&
        [...Array(numRows)].map((_, i) => (
          <Skeleton className={`w-full bg-gray-200 ${className}`} key={i} />
        ))}
    </div>
  );
};

export default SkeletonLoader;
