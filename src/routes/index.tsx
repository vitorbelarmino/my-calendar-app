import { Route, Routes } from "react-router-dom";

import Calendar from "../pages/Calendar";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Calendar />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
