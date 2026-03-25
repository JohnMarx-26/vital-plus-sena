import { useEffect, useState} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function Carousels({
    children: slides, 
    autoSlide = false,
    autoSlideInterval = 3000,

}){

    //Estado para pasar a un slide anterior o posterior segun el boton que se oprima
    const [curr, setCurr] = useState(0)
    const prev = () => setCurr((curr) => (curr == 0 ? slides.length - 1 : curr - 1))
    const next = () => setCurr((curr) => (curr ==  slides.length - 1  ? 0 : curr + 1))

    useEffect(() => {
        if(!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    },[])

    return(
        <div className="overflow-hidden relative">

            {/* aca se van a guardar las imagenes que se traigan desde el home */}
            <div className=" flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${curr * 100}%)`}}   // genera la transicion completa de la imgane  en horizonta (X)
            >{slides}</div>

            {/* los botones de navegacion entre imagenes  tipo Instagram */}
            <div  className="absolute inset-0 flex items-center justify-between p-4">
                <button className="p-1 rounded-full shadow bg-background text-text-muted hover:bg-brand"
                    onClick={prev}>
                    <ChevronLeft size={30}/>
                </button>
                <button className="p-1 rounded-full shadow bg-background text-text-muted hover:bg-brand"
                    onClick={next}>
                    <ChevronRight size={30}/>
                </button>
            </div>

            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                        <div className={`
                            transition-all w-3 h-3  bg-background rounded-full
                            ${curr == i ? "p-2" : "bg-opacity-60"}   
                        `}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
