import { Skeleton, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetCountItem } from "../../Item/api";

export const TotalItemSection: React.FC = () => {
  const { pathname } = useLocation();
  const [totalItem, setTotalItem] = useState<number>(0);
  const { data: DataTotalItem, isLoading: LoadingTotalItem } = useGetCountItem(
    pathname.includes("frozen") ? "Frozen" : "!Frozen"
  );
  useEffect(() => {
    if (DataTotalItem) {
      setTotalItem(DataTotalItem);
    } else {
      setTotalItem(0);
    }
  }, [DataTotalItem]);
  return (
    <>
      <div className="bg-white shadow-md rounded-xl p-2">
        <div className="px-1">
          <Text size="sm" fw={600}>
            Total Barang {pathname.includes("frozen") ? "Frozen" : "Gudang  "}
          </Text>
        </div>
        <div className="flex justify-center py-6">
          {!LoadingTotalItem ? (
            <Text size={"70px"} fw={700} c={"#654433"}>
              {totalItem}
            </Text>
          ) : (
            <Skeleton width={50} height={50} />
          )}
        </div>
      </div>
    </>
  );
};
