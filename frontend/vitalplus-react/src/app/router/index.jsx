import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/shared/layout/MainLayout";
import AuthLayout from "@/shared/layout/AuthLayout";

import HomePage from "@/features/home/page/homepage";
import ProfilePage from "@/features/users/pages/ProfilePage";
import CreateUserPage from "@/features/users/pages/CreateUserPage";
import EditUserForm from "@/features/users/components/EditUserForm";

import {
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  AdminLoginPage,
} from "@/features/auth";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";

// MENU DE ADMINISTRACIÓN
import { MainMenu } from "@/features/Main";
import { CreateSalePage } from "@/features/sales";
import { CreateProductPage, ProductDetailPage } from "@/features/products";
import { CreateSupplierPage } from "@/features/suppliers";
import { ProfileUserPage } from "@/features/users";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <DashboardPage /> },

      { path: "cursos", element: <h1 className="p-4">Cursos</h1> },
      { path: "contacto", element: <h1 className="p-4">Contacto</h1> },
      { path: "videos", element: <h1 className="p-4">Videos</h1> },

      { path: "perfil", element: <ProfilePage /> },
      { path: "usuarios/editar", element: <EditUserForm /> },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/admin/login", element: <AdminLoginPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },

  { path: "/main", element: <MainMenu /> },

  // USUARIOS
  { path: "/usuarios/crear", element: <CreateUserPage /> },
  { path: "/usuarios/visualizar", element: <ProfileUserPage /> },

  // VENTAS
  { path: "/ventas/crear", element: <CreateSalePage /> },

  // PRODUCTOS
  { path: "/productos/crear", element: <CreateProductPage /> },
  { path: "/productos/visualizar", element: <ProductDetailPage /> },

  // PROVEEDORES
  { path: "/proveedores/crear", element: <CreateSupplierPage /> },
]);

export default router;