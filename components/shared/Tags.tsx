import React from "react";

import { Badge } from "../ui/badge";
import { TagProps } from "@/types";

const Tags = ({ tags, extraStyles = "", largeCard }: TagProps) => {
  const shortTags = tags.filter((tag: any) => tag.length <= 10);

  return (
    <div className="flex w-full justify-start gap-2">
      {shortTags.length > 0 &&
        shortTags.slice(0, 3).map((tag) => {
          return (
            <Badge
              key={tag}
              className={`rounded-[5px] ${extraStyles} px-[10px] py-[5px] leading-snug text-neutral-400 ${
                largeCard ? "dark:bg-darkBg-3" : "dark:!bg-darkBg-2"
              }  md:text-sm`}
            >
              {tag}
            </Badge>
          );
        })}
    </div>
  );
};

export default Tags;
