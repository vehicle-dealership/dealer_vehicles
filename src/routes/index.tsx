import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Product } from "../pages/Product";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { Register } from "../pages/Register";
import { ChangePassword } from "../pages/ChangePassword";

export const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/changePassword/:token" element={<ChangePassword />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
