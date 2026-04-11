import { ProductSection } from "@/features/products";

export default function DermatologyProductPage(){

    return(

        <div>
            {/* //================= Titulo Pagina ================== */}
            <h1 className="
            flex justify-center
            text-brand font-bold
            text-xl
            mt-12
            mb-5
            ">Dermatologia</h1>
            
            {/* //================= Separador ================== */}   
            <div className =" flex h-3 w-12 mx-auto justify-center bg-brand mb-3" ></div>

            {/* //================= Contenedor de las cards ================== */} 
            <div className = "flex flex-col md:flex-row gap-2">
                <ProductSection variant = "client" category="dermatologia" />
            </div>
        </div>
    );
}