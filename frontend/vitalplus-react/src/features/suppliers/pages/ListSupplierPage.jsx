import SupplierDataTable from "../components/SupplierDataTable";
import {  SupplierColumns }   from "../table/SupplierColumns";
import { suppliers } from "@/data/supplier/suppliers";
import Header from "@/shared/components/Header";

export default function ListSupplierPage() {

  return (
    <div className="w-full h-dvh">
      <Header/>
    <div className="p-6">
      
      <SupplierDataTable
        data={suppliers}
        columns={SupplierColumns}
      />

    </div>
    </div>
  )
}




