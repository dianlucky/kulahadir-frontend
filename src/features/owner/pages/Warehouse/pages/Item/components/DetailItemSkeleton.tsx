import { Divider, Skeleton } from "@mantine/core";
import React from "react";

export const DetailItemSkeleton: React.FC = () => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-2">
        <div className="grid grid-cols-12 p-2">
          <div className="col-span-4 mx-auto ">
            <Skeleton height={70} circle />
          </div>
          <div className="col-span-7 mt-1">
            <Skeleton height={15} width="60%" />

            <Skeleton height={15} width="20%" mt={22} />
          </div>
        </div>
        <Divider mx={7} />
        <Skeleton height={15} width="80%" my={10} ml={10} />
        <Divider mx={7} mt={6} />
        <Skeleton height={15} width="80%" my={10} ml={10} />
      </div>
    </>
  );
};
