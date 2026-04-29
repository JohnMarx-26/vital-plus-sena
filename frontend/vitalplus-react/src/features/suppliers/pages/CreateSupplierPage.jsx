import { SupplierForm } from "@/features/suppliers";
import { FormLayout } from "@/shared";

export default function CreateSupplierPage() {
  return (
    <FormLayout>
      <SupplierForm 
       formId="suppliersForm"
       submitLabel="Guardar" />
    </FormLayout>
  );
}
