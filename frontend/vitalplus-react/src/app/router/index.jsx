import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/shared/layout/MainLayout";
import AuthLayout from "@/shared/layout/AuthLayout";

import HomePage from "@/features/home/page/homepage";
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
  ListSalePage } 
  from "@/features/sales";

import {
  CreateProductPage,
  ProductDetailClient,
  ProductDetailPage,
  ListProductPage,
  EditProductPage,
  BeautyProductsPage,
  OfferProductPage,
  MedicineProductsPage,
  DermatologyProductPage,
  MaternityProductPage,
  PersonalProductsPage,
} 
from "@/features/products";

import {
  CreateSupplierPage,
  EditSupplierPage,
  SupplierDetailPage,
  ListSupplierPage,
}
from "@/features/suppliers";

import { ProfileUserPage } from "@/features/users";
import ProfileUserSimplePage from "../../features/users/pages/ProfileUserSimplePage";
import { ListUserPage } from "../../features/users";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <DashboardPage /> },

      { path: "cursos", element: <h1 className="p-4">Cursos</h1> },
      { path: "contacto", element: <h1 className="p-4">Contacto</h1> },
      { path: "videos", element: <h1 className="p-4">Videos</h1> },

      { path: "/usuarios/detalles", element: <ProfileUserSimplePage /> },

      //Detalle de los productos
      { path: "/products/:id", element: <ProductDetailClient /> },
      //filtros de los productos
      { path: "/products/Cosmetics/:id", element: <BeautyProductsPage /> },
      { path: "/products/Offers/:id", element: <OfferProductPage /> },
      { path: "/products/Medicines/:id", element: <MedicineProductsPage /> },
      { path: "/products/Dermatology/:id", element: <DermatologyProductPage /> },
      { path: "/products/Maternity/:id", element: <MaternityProductPage /> },
      { path: "/products/Personal/:id", element: <PersonalProductsPage /> },
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
  { path: "/usuarios/edit", element: <EditUserPage /> },
  { path: "/usuarios/view", element: <ProfileUserPage /> },
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