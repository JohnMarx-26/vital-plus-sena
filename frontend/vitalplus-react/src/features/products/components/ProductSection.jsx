import { Card} from "@/shared";
import { useNavigate} from "react-router-dom";
import { product_card } from "@/data/product/product_card";
import  {useAddToCart} from "../hooks/useAddToCart";

export default function ProductSection({ variant, onSelectProduct, category, discount,}) {

  //================== para navegar por el router =================
  const navigate = useNavigate();

  const handleSelectProduct = (product) => {
    if (variant === "client") {
      navigate(`/products/${product.id}`, { state: { product } });
    } else {
      onSelectProduct?.(product);
    }
  };

  /*todos los productos con stock en cero no se mostraran en la tienda virtual
  pero si seran visibles desde apartado de ventas del farmaceuta,
    
  el filtro byCategory separa las cards por sus categorias haciendo que 
  solo se muestre en el filtro este tipo de productos
  
  el filtro de descuento permite que en el filtro de descuento se
  muestren todos los prodcutos que cuentan con descuento*/
  const filteredProducts = product_card.filter((product) => {
  //============== Filtro de Stock =================  
  const byStock = variant === "client" ? product.stock > 0 : true;
  //============== Filtro de Categoria =================  
  const byCategory = category ? product.category === category : true;
  //============== Filtro de Descuento =================  
  const byDiscount = discount ? product.discount < product.price : true;
  //============== Retorna segun el filtro==============
  return byStock && byCategory && byDiscount;
})

const { handleComprar } = useAddToCart();
    
  return (
    <section className="w-full px-3 py-10">
      <div
        className={` ${
          variant === "pos"
            ? `mx-auto max-w-7xl gap-y-3
        grid grid-cols-1 sm:grid-cols-2
        lg:grid-cols-3 xl:grid-cols-4 
        not-last:gap-6 place-items-center`
            : `
        mx-auto max-w-7xl gap-y-3
        grid grid-cols-1 sm:grid-cols-2
        lg:grid-cols-3 xl:grid-cols-4 
        not-last:gap-6 place-items-center`
        }`}
      >
        {filteredProducts.map((product, index) => (
          <Card
            key={`${product.id} ${index}`}
            className="cursor-pointer hover:scale-[1.02] active:scale-95 transition-all w-full flex justify-center"
            variant={variant}
            product={product}
            onSelectProduct={handleSelectProduct}
            onComprar={
              variant === "client"
                ? (e) => handleComprar(e, product)
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
