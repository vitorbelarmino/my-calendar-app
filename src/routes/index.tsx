import { Route, Routes, Navigate, BrowserRouter, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Calendar from "../pages/Calendar";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";

function RedirectIfAuth() {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : <Outlet />;
}

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Calendar />} />
        </Route>

        <Route element={<RedirectIfAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
