"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PaginationArrowRight from "./PaginationArrowRight";
import PaginationArrowLeft from "./PaginationArrowLeft";
import { formUrlQuery, calculatePageRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
}

const Pagination = ({ pageNumber, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [currentPageRange, setCurrentPageRange] = useState<number[]>([]);

  useEffect(() => {
    setCurrentPage(pageNumber);
    const newPageRange = calculatePageRange(pageNumber, totalPages);
    setCurrentPageRange(newPageRange);
  }, [pageNumber, totalPages]);

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const items = new Map<string, string>();
    items.set("page", nextPageNumber.toString());
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      items,
    });

    setCurrentPage(nextPageNumber);

    router.push(newUrl);
  };

  const handlePageChange = (pageNumber: number) => {
    const items = new Map<string, string>();
    items.set("page", pageNumber.toString());
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      items,
    });

    setCurrentPage(pageNumber);

    router.push(newUrl);
  };

  if (totalPages === 0) return null;

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="flex min-h-[36px] items-center justify-center gap-2 rounded-lg border border-natural-1 bg-white text-natural-1 shadow dark:border-darkBg-2 dark:bg-darkBg-3 dark:text-natural-5"
      >
        <PaginationArrowLeft />

        <div className="hidden text-sm font-bold leading-normal text-natural-8 dark:text-natural-5 lg:flex">
          Previous
        </div>
      </Button>

      <div className="hidden items-start justify-start gap-0.5 lg:flex">
        {currentPageRange.length > 0 &&
          currentPageRange.map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg  ${
                currentPage === page
                  ? "bg-primary"
                  : "bg-transparent hover:bg-transparent focus:bg-transparent"
              }`}
            >
              <div className="inline-flex shrink grow basis-0 items-center justify-center self-stretch rounded-lg p-3">
                <div
                  className={`text-center text-sm font-semibold leading-normal ${
                    currentPage === page
                      ? "text-natural-1"
                      : "text-natural-7 dark:text-natural-6"
                  }`}
                >
                  {page}
                </div>
              </div>
            </Button>
          ))}
      </div>

      <div className="inline-flex h-[52px] w-[327px] items-center justify-center border-zinc-800 pt-4 lg:hidden">
        <div className="flex gap-2 text-sm font-semibold leading-normal">
          <div className="text-natural-7 dark:text-natural-6">Page </div>
          <div className="text-natural-8 dark:text-white">{pageNumber}</div>
          <div className="text-natural-7 dark:text-natural-6">
            {" "}
            of {totalPages}
          </div>
        </div>
      </div>

      <Button
        disabled={pageNumber === totalPages}
        onClick={() => handleNavigation("next")}
        className="flex min-h-[36px] items-center justify-center gap-2 rounded-lg border border-natural-1 bg-white text-natural-1 shadow dark:border-darkBg-2 dark:bg-darkBg-3 dark:text-natural-5"
      >
        <div className="hidden text-sm font-bold leading-normal text-natural-8 dark:text-natural-5 lg:flex">
          Next
        </div>

        <PaginationArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
