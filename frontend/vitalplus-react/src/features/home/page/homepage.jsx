//Pagina publica
import { useState, useEffect } from "react";
import Modal from "@/shared/components/Modal";
import MenuBar from "@/features/home/components/MenuBar";
import Carousels from "@/features/home/components/Carousel";
// import img1 from "@/assets/imagen-1.jpg";
import img1 from "@/assets/imagen-2.png";
import img2 from "@/assets/imagen-3.png";

// import Navbar from "@/shared/layout/Navbar";

export default function HomePage(){
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    },[]);
// 
    //constantes para el slide importando las imagenes
    const slides = [img1,img2]

    return (
        <section>
            
            {/* carousel  */}
            <div className=" flex w-full  justify-evenly p-1">
                {/* carousel 1 */}
                <div className="w-1/2 h-[350px]">
                    <Carousels autoSlide={true} autoSlideInterval={5000}>
                        {slides.map((s) => (
                            <img src={s} className="w-full h-full object-cover"/>
                        ))}
                    </Carousels>
                </div>
                {/* carousel 2 */}
                <div className="w-1/2 h-[350px]">
                    <Carousels autoSlide={true} autoSlideInterval={5000}>
                        {slides.map((s) => (
                            <img src={s} className="w-full h-full object-cover"/>
                        ))}
                    </Carousels>
                </div>
            </div>
            {/* Espaciado de la Pagina */}
            <div className="h-5 min-w-full"></div>
            
            {/* menu de navegacion del home */}
            {/* <div className="relative z-10 text-center ">*/}
            <div>
                <MenuBar />
            </div>

                <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Bienvenido"
                // image={imagenPrueba}
            >
                <p>Tu farmacia de confianza, VitalPlus</p>
                </Modal>
        </section>
    )


}
