import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/shared/layout/MainLayout";
import AuthLayout from "@/shared/layout/AuthLayout";

import HomePage from "@/features/home/page/homepage";
// import ProfilePage from "@/features/users/pages/ProfilePage";
import CreateUserPage from "@/features/users/pages/CreateUserPage";
import CreateUserPageSale from "@/features/users/pages/CreateUserPageSale";
import EditUserPage from "@/features/users/pages/EditUserPage";

import {
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NewPasswordPage,
  AdminLoginPage,
} from "@/features/auth";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";

// MENU DE ADMINISTRACIÓN
import { MainMenu } from "@/features/Main";
import {
  CreateSalePage,
  SaleDetailPage,
  ListSalePage,
} from "@/features/sales";

import {
  CreateProductPage,
  EditProductPage,
  ProductDetailPage,
  ListProductPage,
} from "@/features/products";

import {
  CreateSupplierPage,
  EditSupplierPage,
  SupplierDetailPage,
  ListSupplierPage,
} from "@/features/suppliers";

import { ProfileUserPage, ListUserPage } from "@/features/users";
import ProfileUserSimplePage from "../../features/users/pages/ProfileUserSimplePage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <DashboardPage /> },

      { path: "cursos", element: <h1 className="p-4">Cursos</h1> },
      { path: "contacto", element: <h1 className="p-4">Contacto</h1> },
      { path: "videos", element: <h1 className="p-4">Videos</h1> },

      // { path: "perfil", element: <ProfilePage /> },
      { path: "/usuarios/detalles", element: <ProfileUserSimplePage /> },

      //Detalle de los productos
      { path: "/products/:id", element: <ProductDetailClient /> },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/admin/login", element: <AdminLoginPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
      { path: "/new-password", element: <NewPasswordPage /> },
    ],
  },

  { path: "/main", element: <MainMenu /> },

  // USUARIOS
  { path: "/usuarios/crear", element: <CreateUserPage /> },
  { path: "/usuarios/visualizar", element: <ProfileUserPage /> },
  { path: "/usuarios/modificar", element: <EditUserPage /> },
  { path: "/usuarios/listar", element: <ListUserPage /> },
  { path: "/usuariosSale/crear", element: <CreateUserPageSale /> },

  // VENTAS
  { path: "/ventas/crear", element: <CreateSalePage /> },
  { path: "/ventas/detalles", element: <SaleDetailPage /> },
  { path: "/ventas/listar", element: <ListSalePage /> },

  // PRODUCTOS
  { path: "/productos/crear", element: <CreateProductPage /> },
  { path: "/productos/modificar", element: <EditProductPage /> },
  { path: "/productos/visualizar", element: <ProductDetailPage /> },
  { path: "/productos/listar", element: <ListProductPage /> },

  // PROVEEDORES
  { path: "/proveedores/crear", element: <CreateSupplierPage /> },
  { path: "/proveedores/modificar", element: <EditSupplierPage /> },
  { path: "/proveedores/detalles", element: <SupplierDetailPage /> },
  { path: "/proveedores/listar", element: <ListSupplierPage /> },
]);

export default router;