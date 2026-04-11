import { SupplierDataTable } from "@/features/suppliers";
import { Header, Button } from "@/shared";
import { useNavigate } from "react-router-dom";
import { SupplierColumns } from "../table/SupplierColumns";
import retroceder from "@/assets/svg/icono-retroceder.svg";
import { useEffect, useState } from "react";
import ReportConfigModal from "../reports/components/ReportConfigModalSupplier";
import { FileDown } from "lucide-react";

// ajusta esta ruta según donde tengas el archivo real
import { getSuppliers } from "../services/suppliersService";

const Botones = () => {
  const navigate = useNavigate();
  const [IsReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="flex w-full justify-between px-10 my-8">
      <div>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <img src={retroceder} alt="icono-retroceder" className="w-5 h-5" />
          Retroceder
        </Button>
      </div>

      <div>
        <Button
          variant="primary"
          onClick={() => setIsReportModalOpen(true)}
          size="sm"
          type="button"
          className="flex items-center gap-2"
        >
          <FileDown className="w-5 h-5" />
          Descargar factura
        </Button>

        <ReportConfigModal
          isOpen={IsReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default function ListSupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSuppliers();

        const formattedSuppliers = data.map((supplier) => ({
          id: supplier.id_proveedor,
          nit: supplier.n_documento ?? "",
          name: supplier.nombre_proveedor,
          razon_social: supplier.razon_social,
          contact: supplier.nombre_contacto,
          phone: supplier.telefono_contacto,
          email: supplier.correo_electronico,
          city: supplier.ciudad,
          address: supplier.direccion,
          is_active: supplier.estado === "activo",
        }));

        setSuppliers(formattedSuppliers);
      } catch (err) {
        setError(err.message || "No se pudo cargar la lista de proveedores");
      } finally {
        setLoading(false);
      }
    };

    loadSuppliers();
  }, []);

  return (
    <div className="w-full h-dvh">
      <Header variant="Main"/>
      <Botones />

      <div className="p-6">
        {loading && <p>Cargando proveedores...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <SupplierDataTable data={suppliers} columns={SupplierColumns} />
        )}
      </div>
    </div>
  );
}