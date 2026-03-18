import { CardPOS } from "@/shared";

import tylenol from "@/assets/images/tylenol.jpg";
import noxpirin from "@/assets/images/noxpirin.png";
import dolex from "@/assets/images/dolex.png";
import noraver from "@/assets/images/noraver.png";
import aspirina100 from "@/assets/images/aspirina100.png"
import apronax550 from "@/assets/images/apronax550.png"
import advilmax from "@/assets/images/advil-max.png"
import dolorsin from "@/assets/images/dolorsin.png"
import buscapinafem from "@/assets/images/buscapinafem.png"
import allegra from "@/assets/images/allegra.png"
import ibuflash from "@/assets/images/ibuflash.png"
import algodon from "@/assets/images/algodon-jgb.png"

const products = [
  {
    id: 12154,
    image: tylenol,
    title: "TYNETOL",
    lab: "GENOMMA COLOMBIA",
    stock: 320,
    price: 12000,
  },
  {
    id: 12155,
    image: noxpirin,
    title: "NOXPIRIN",
    lab: "TECNOQUIMICAS",
    stock: 130,
    price: 13000,
    discount: 10450,
  },
  {
    id: 12156,
    image: aspirina100,
    title: "BAYER",
    lab: "ASPIRINA 100",
    stock: 20,
    price: 8000,
  },
  {
    id: 12157,
    image: apronax550,
    title: "GRÜNENTHAL",
    lab: "APRONAX 550MG",
    stock: 100,
    price: 7500,
    discount: 6100,
  },
  {
    id: 12158,
    image: advilmax,
    title: "ADVIL MAX",
    lab: "PFIZER",
    stock: 320,
    price: 15900,
  },
  {
    id: 12159,
    image: dolorsin,
    title: "DOLORSIN",
    lab: "LABORATORIOS LAFRANCOL",
    stock: 180,
    price: 12300,
    discount: 11450,
  },
  {
    id: 12160,
    image: buscapinafem,
    title: "PROCAPS",
    lab: "BUSCAPINA FEM",
    stock: 103,
    price: 9850,
  },
  {
    id: 12161,
    image: allegra,
    title: "SANOFI",
    lab: "ALLEGRA 180MG",
    stock: 320,
    price: 12000,
    discount: 10450,
  },
  {
    id: 12162,
    image: dolex,
    title: "HALEON",
    lab: "DOLEX GRIPA",
    stock: 10,
    price: 5500,
  },
  {
    id: 12163,
    image: ibuflash,
    title: "IBUFLASH",
    lab: "TECNOQUIMICAS",
    stock: 50,
    price: 9850,
    discount: 9120,
  },
  {
    id: 12164,
    image: noraver,
    title: "NORAVER GRIPA",
    lab: "JGB",
    stock: 144,
    price: 11200,
  },
  {
    id: 12165,
    image: algodon,
    title: "ALGOBON 125g",
    lab: "JGB",
    stock: 320,
    price: 9300,
    discount: 8100,
  },
  
];

export default function ProductSectionPOS({ onSelectProduct }) {
  return (
    // <section className="w-full px-4 py-10">
    //   <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
    //     {products.map((product, index) => (
    //       <CardPOS key={`${product.title}-${index}`} product={product} />
    //     ))}
    //   </div>
    // </section>

    <section className="w-full px-4 py-6">
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
        {products.map((product, index) => (
          <div 
            key={`${product.id}-${index}`} 
            onClick={() => onSelectProduct?.(product)} // <--- Acción al hacer clic
            className="cursor-pointer hover:scale-[1.02] active:scale-95 transition-all w-full flex justify-center"
          >
            {/* Usamos tu Card original tal cual me la pasaste */}
            <CardPOS product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}


