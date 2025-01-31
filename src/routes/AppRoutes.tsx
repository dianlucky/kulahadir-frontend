// import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { HomeLayout, AppLayout } from "@/components/layout";
// import { useAuth } from "@/features/auth";
// import { queryClient } from '@/lib/react-query';
import { lazyImport } from "@/utils/lazyImport";
const { Home } = lazyImport(() => import("@/features/misc"), "Home");


export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};
