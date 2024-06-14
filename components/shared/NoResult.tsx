import React from "react";

interface NoResultProps {
  title: string;
  description: string;
}

const NoResult = ({ title, description }: NoResultProps) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <div className="text-5xl">😮‍💨</div>

      <h1 className="mt-8 text-2xl font-bold dark:text-natural-4">{title}</h1>
      <p className="my-3.5 max-w-md text-center font-medium dark:text-natural-6">
        {description}
      </p>
    </div>
  );
};

export default NoResult;
