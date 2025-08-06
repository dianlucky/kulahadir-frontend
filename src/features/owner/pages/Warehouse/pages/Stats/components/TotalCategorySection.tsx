import { Skeleton, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetCountCategory } from "../../Category";

export const TotalCategorySection: React.FC = () => {
  const { pathname } = useLocation();
  // Get Total Categories by pathname
  const [totalCategory, setTotalCategory] = useState<number>(0);
  const { data: DataTotalCategory, isLoading: LoadingTotalCategory } =
    useGetCountCategory(pathname.includes("frozen") ? "Frozen" : "!Frozen");
  useEffect(() => {
    if (DataTotalCategory) {
      setTotalCategory(DataTotalCategory);
    } else {
      setTotalCategory(0);
    }
  }, [DataTotalCategory]);
  // End for Get Total Categories by pathname

  return (
    <>
      <div className="bg-white shadow-md rounded-xl p-2">
        <div className="px-2">
          <Text size="sm" fw={600}>
            Total Kategori
          </Text>
        </div>
        <div className="flex justify-center py-6">
          {!LoadingTotalCategory ? (
            <Text size={"70px"} fw={700} c={"#654433"}>
              {totalCategory}
            </Text>
          ) : (
            <Skeleton width={50} height={50} />
          )}
        </div>
      </div>
    </>
  );
};
