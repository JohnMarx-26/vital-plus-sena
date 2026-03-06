import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // demo
    navigate("/login");
  };

  return (
    <Button variant="secondary" size="md" type="button" onClick={handleLogout}>
      Cerrar sesión
    </Button>
  );
}