import { Route, Routes } from "react-router-dom";

import Calendar from "../pages/Calendar";
import NotFound from "../pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Calendar />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
