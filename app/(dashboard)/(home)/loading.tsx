import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import React from "react";

const Loading = () => {
  const currentDate = moment().format("MMMM Do YYYY");
  return (
    <section id="home" className="w-full bg-natural-3 dark:bg-darkBg-1 ">
      <div className="flex flex-col">
        <h1 className="mt-10 font-manrop text-[22px] font-bold leading-8 text-black dark:text-white lg:text-[32px] lg:leading-10">
          Welcome to the Job Search Platform for Developers
        </h1>
        <p className="mb-[30px] mt-3 font-manrop text-[16px] font-medium leading-6 text-natural-6 lg:mb-[34px] lg:text-xl">
          {currentDate}
        </p>
      </div>

      <div className="mt-9 grid grid-cols-1 items-start justify-start gap-10  xl:grid-cols-[66%_33%]">
        <div className="items-center justify-between">
          <div className="flex w-full justify-between">
            <h2 className="font-manrop text-[22px] font-semibold leading-loose text-gray-900 dark:text-white sm:font-bold">
              Latest Job Posts
            </h2>
            <Button
              className="w-[75px] self-center rounded-[10px] border-[1px] border-natural-2
           bg-natural-3 px-[10px] py-[7px] font-manrop text-[16px] font-medium text-natural-7 hover:text-white dark:border-natural-7 dark:bg-darkBg-1 hover:dark:bg-primary hover:dark:text-white "
            >
              See All
            </Button>
          </div>
          <div className="mt-[33px] flex flex-col rounded-[10px] md:grid md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col p-5">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <Skeleton className="mt-5 h-[200px] w-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="xl:order-last">
          <h2 className="font-manrop text-[22px] font-semibold leading-loose text-gray-900 dark:text-white sm:font-bold">
            Featured Companies
          </h2>
          <div className="mt-[30px] flex w-full flex-col justify-start gap-[40px] p-5 max-sm:mt-[30px] md:grid md:grid-cols-3 lg:mt-[20px]">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" mb-5 items-center justify-between">
          <div className="flex w-full justify-between">
            <h2 className="font-manrop text-[22px] font-semibold leading-loose  text-gray-900 dark:text-white sm:font-bold">
              Recommended For You
            </h2>
            <Button
              className="w-[75px] self-center rounded-[10px] border-[1px] border-natural-2 bg-natural-3
           px-[10px] py-[7px] font-manrop text-[16px] font-medium text-natural-7 hover:text-white dark:border-natural-7 dark:bg-darkBg-1 hover:dark:bg-primary hover:dark:text-white"
            >
              See All
            </Button>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
