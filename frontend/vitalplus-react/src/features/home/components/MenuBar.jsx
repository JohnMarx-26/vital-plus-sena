import { Link } from "react-router-dom";
import img1 from "@/assets/img-acne.png";
import img2 from "@/assets/img-aseo.png";
import img3 from "@/assets/img-fash.png";
import img4 from "@/assets/img-mama.png";
import img5 from "@/assets/img-med.png";
import img6 from "@/assets/img-ofertas.png";

export default function MenuBar(){
    return(
        <div className=" min-w-full h-40 bg-brand">

            <ul className="hidden md:flex items-center gap-6 justify-center">
                <li>
                    <Link to="/ofertas" className="hover:text-primary transition flex flex-col items-center gap-2  py-4">
                        <img src={img6} alt="Ofertas" className="w-20 h-20" />
                        Ofertas
                    </Link>
                </li>
                <li>
                    <Link to="/medicamentos" className="hover:text-primary transition flex  flex-col items-center gap-2  py-4">
                        <img src={img5} alt="Medicamentos" className="w-20 h-20" />
                        Medicamentos
                    </Link>
                </li>
                <li>
                    <Link to="/cuidadob" className="hover:text-primary transition flex  flex-col items-center gap-2  py-4">
                    <img src={img3} alt="Cuidado y belleza" className="w-20 h-20" />
                        Cuidado y Belleza
                    </Link>
                </li>
                <li>
                    <Link to="/dermatologia" className="hover:text-primary transition flex flex-col items-center gap-2  py-4">
                        <img src={img1} alt="Dermatologia" className="w-20 h-20" />
                        Dermatologia
                    </Link>
                </li>
                <li>
                    <Link to="/maternidad" className="hover:text-primary transition flex flex-col  items-center gap-2  py-4">
                        <img src={img4} alt="Maternidad" className="w-20 h-20" />
                        Maternidad
                    </Link>
                </li>
                <li>
                    <Link to="/cuidadop" className="hover:text-primary transition flex flex-col items-center gap-2  py-4">
                        <img src={img2} alt="Cuidado Personal" className="w-20 h-20" />
                        Cuidado personal
                    </Link>
                </li>
        </ul>

        </div>


    );
}