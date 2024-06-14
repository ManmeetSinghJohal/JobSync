"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Loader2 } from "lucide-react";

import { convertSalariesToYearlyBase } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface Props {
  jobTitle: string;
  location: string;
  search: Promise<any>;
}

const ChartCard = ({ jobTitle, location, search }: Props) => {
  const [searchedData, setSearchedData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const estimatedSalary = await search;
        const searchedData = convertSalariesToYearlyBase(estimatedSalary.data);
        setSearchedData(searchedData);
        setIsLoading(false);
      } catch (error) {
        console.log("Failed to fetch estimated salary data:", error);
      }
    }
    getData();
  }, [search]);

  const labels = searchedData.map((item: any) => item.publisher_name);

  const data = {
    labels,
    datasets: [
      {
        label: "Minimum salary",
        data: searchedData.map((item: any) => item.minYearlySalary),
        backgroundColor: "rgba(253, 221, 140, 1)",
      },
      {
        label: "Maximum salary",
        data: searchedData.map((item: any) => item.maxYearlySalary),
        backgroundColor: "rgba(11, 171, 124, 0.7)",
      },
      {
        label: "Median salary",
        data: searchedData.map((item: any) => item.medianYearlySalary),
        backgroundColor: "rgba(255, 187, 215, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        left: 26,
        top: 24,
        right: 10,
      },
    },
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 10,
          boxHeight: 10,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 50000,
        max: Math.max(...searchedData.map((item: any) => item.maxYearlySalary)),
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value: number) {
            const formattedValue = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: `${searchedData[0].salary_currency}`,
              currencyDisplay: "code",
              minimumFractionDigits: 0,
            }).format(value);

            return formattedValue;
          },
          count: 3,
          padding: 10,
          labelOffset: -5,
        },
      },

      x: {
        grid: {
          display: false,
        },
        ticks: {
          align: "center",
        },
      },
    },
    datasets: {
      bar: {
        barThickness: 20,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: "rgba(255, 255, 255, 0)",
      },
    },
  } as const;

  return (
    <div className="rounded-[10px] bg-white p-[26px] dark:bg-darkBg-2">
      <h1 className="ml-7 mt-5 text-start font-manrop text-[22px] font-bold dark:text-white">
        Estimated Salary <span className="font-normal">for</span> {jobTitle}{" "}
        <span className="font-normal">in </span>
        {location}
      </h1>

      {isLoading ? (
        <div className="flex h-[325px] items-center justify-center p-4">
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Loading...</p>
          </>
        </div>
      ) : searchedData.length > 0 ? (
        <Bar
          options={options as {}}
          data={data}
          plugins={[
            {
              id: "increase-legend-spacing",
              beforeInit(chart) {
                // Get reference to the original fit function
                const originalFit = (chart.legend as any).fit;
                // Override the fit function
                (chart.legend as any).fit = function fit() {
                  // Call original function and bind scope in order to use `this` correctly inside it
                  originalFit.bind(chart.legend)();
                  this.height += 35;
                };
              },
            },
          ]}
        />
      ) : (
        <div className="flex h-[325px] flex-col items-center justify-center p-4">
          <h1 className="text-start font-manrop text-[22px] font-bold dark:text-white">
            Sorry - No Job has been found for your location.
          </h1>
          <p className="text-xl text-gray-400 dark:text-gray-500">
            Please try another search, or create an alert on your Job Search. 😊
          </p>
        </div>
      )}
    </div>
  );
};

export default ChartCard;
