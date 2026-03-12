import SupplierDataTable from "../components/SupplierDataTable";
import {  SupplierColumns }   from "../table/SupplierColumns";
import { users } from "@/data/user/users";

export default function ListSupplierPage() {

  return (
    <div className="p-6">

      <h1 className="text-xl font-semibold mb-4">
        Proveedores
      </h1>

      <SupplierDataTable
        data={users}
        columns={SupplierColumns}
      />

    </div>
  )
}

