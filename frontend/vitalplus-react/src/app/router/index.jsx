import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/shared/layout/MainLayout";
import AuthLayout from "@/shared/layout/AuthLayout";

import HomePage from "@/features/home/page/homepage";
import ProfilePage from "@/features/users/pages/ProfilePage";

import LoginPage from "@/features/auth/pages/LoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "cursos",
        element: <h1 className="p-4">Cursos</h1>,
      },
      {
        path: "contacto",
        element: <h1 className="p-4">Contacto</h1>,
      },
      {
        path: "videos",
        element: <h1 className="p-4">Videos</h1>,
      },
      {
        path: "perfil",
        element: <ProfilePage />,
      },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
]);

export default router;