//Pagina publica
import { useState, useEffect } from "react";
import Modal from "@/shared/components/Modal";
import imagenPrueba from "@/assets/images/imagen-prueba.png";
import heroBg from "@/assets/images/imagen-hero.jpg"

export default function HomePage(){
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center text-black" 
        style={
            {
                backgroundImage: `url(${heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }
        }>
        
            <div className="absolute inset-0 -z-10  bg-white/60"> </div> 
            <div className="relative z-10 text-center "> 
                <h1 className="text-h1 font-bold">Bienvenido al Sena</h1>
                <p className="text-body">
                    Aprende segun tus gustos, desde panaderia hasta control numerico.
                </p>
            </div>
                        <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Bienvenido"
                image={imagenPrueba}
            >
                <p>Tu farmacia de confianza, VitalPlus</p>
            </Modal>
        </section>
    )


}

