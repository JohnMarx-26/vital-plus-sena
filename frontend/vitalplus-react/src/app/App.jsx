import { RouterProvider } from "react-router-dom";
import router from "@/app/router/index.jsx";
import ProfileUserPage from "@/features/users/pages/ProfileUserPage";
import ProductDetailPage from "@/features/products/pages/ProductDetailPage";

export default function App() {
  return <ProductDetailPage/>
  // <RouterProvider router={router} />
}
