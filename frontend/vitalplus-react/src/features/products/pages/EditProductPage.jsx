import { ProductForm } from "@/features/products";
import { FormLayout } from "@/shared";

export default function EditProductPage() {
  return (
    <FormLayout>
      <ProductForm
        formId="editProductForm"
        submitLabel="Actualizar"
      />
    </FormLayout>
  );
}