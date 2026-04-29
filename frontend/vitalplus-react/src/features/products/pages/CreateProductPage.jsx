import { ProductForm } from "@/features/products";
import { FormLayout } from "@/shared";

export default function CreateProductPage() {
  return (
    <FormLayout>
      <ProductForm
        formId="productForm"
        submitLabel="Guardar"
      />
    </FormLayout>
  );
}