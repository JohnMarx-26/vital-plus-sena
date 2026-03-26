import { SupplierForm } from "@/features/suppliers";
import { FormLayout } from "@/shared";

export default function EditSupplierPage() {
  return (
    <FormLayout>
      <SupplierForm formId="editSupplierForm" submitLabel="Actualizar" />
    </FormLayout>
  );
}