import {ProductShippingForm} from "@/features/products"
import {CheckoutStepper} from "@/shared"

export default function ProductShippingPage(){

    return(

        <div className="max-w-4xl mx-auto px-4 py-2">
            {/* //================= Titulo Pagina ================== */}
            <h1 className="
            flex justify-center
            text-brand font-bold
            text-h2
            mt-12
            mb-5
            ">Información de Envio</h1>

            {/* //========= Pasos del carrito ====== */}
            <div className="flex px-10">
            <CheckoutStepper currentStep={1} />
            </div>
            {/* //================= Contenedor de las cards ================== */} 
            <div className = "flex  justify-center gap-2">
            <ProductShippingForm/>
            </div>
        </div>
    );
}
