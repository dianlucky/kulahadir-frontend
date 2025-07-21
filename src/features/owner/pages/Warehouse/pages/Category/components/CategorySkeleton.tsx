import { Divider, Skeleton } from "@mantine/core";
import React from "react";

export const CategorySkeleton: React.FC = () => {
  return (
    <>
      <section className="bg-white mx-auto max-w-sm w-full shadow-lg rounded-md relative p-4">
        <div className="flex justify-between text-xs items-center mb-2">
          <Skeleton height={10} width="70%" radius="xl" />
          <Skeleton height={20} circle />
        </div>
        <Divider size="xs" className="mb-2" />
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <div className="grid grid-cols-12 px-2">
              <div className="col-span-1 m-auto">
                <Skeleton height={10} width="100%" radius="xl" />
              </div>
              <div className="col-span-1 ml-1">
                <div className="w-px h-full bg-gray-300 mx-4" />
              </div>
              <div className="col-span-8 ml-1 my-auto">
                <Skeleton height={10} width="100%" radius="xl" />
              </div>
              <div className="col-span-2 ml-4">
                <Skeleton height={20} circle />
              </div>
            </div>
            <div className="mt-2 mb-2">
              <Divider />
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
