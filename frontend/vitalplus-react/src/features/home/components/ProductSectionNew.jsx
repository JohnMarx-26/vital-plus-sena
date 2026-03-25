import { CardNew } from "@/shared";

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
    lab: "GENOMMA COLOMBIA",
    title: "TYLENOL",
    image: tylenol,
    price: 18200,
    discount: 17290,
  },
  {
    lab: "TECNOQUIMICAS",
    title: "NOXPIRIN",
    image: noxpirin,
    price: 8500,
  },
  {
    lab: "BAYER",
    title: "ASPIRINA 100",
    image: aspirina100,
    price: 24600,
    discount: 21900,
  },
  {
    lab: "GRÜNENTHAL",
    title: "APRONAX 550MG",
    image: apronax550,
    price: 32400,
  },
  {
    lab: "PFIZER",
    title: "ADVIL MAX",
    image: advilmax,
    price: 15900,    
    discount: 13500,
  },
  {
    lab: "LABORATORIOS LAFRANCOL",
    title: "DOLORSIN",
    image: dolorsin,
    price: 12800,
  },
  {
    lab: "PROCAPS",
    title: "BUSCAPINA FEM",
    image: buscapinafem,
    price: 19500,
    discount: 16900,
  },
  {
    lab: "SANOFI",
    title: "ALLEGRA 180MG",
    image: allegra,
    price: 65000, 
    discount: 58500,
  },
  {
    lab: "HALEON",
    title: "DOLEX GRIPA",
    image: dolex,
    price: 14200,
  },
  {
    lab: "TECNOQUIMICAS",
    title: "IBUFLASH ",
    image: ibuflash, 
    price: 7800,
    discount: 6900,
  },
  {
    lab: "JGB",
    title: "NORAVER GRIPA",
    image: noraver,
    price: 11200,
  },
  {
    lab: "JGB",
    title: "ALGOBON 125g",
    image: algodon,
    price: 9300,
    discount: 8100,
  }
];

export default function ProductSection() {
  return (
    <section className="w-full px-4 py-10">
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
        {products.map((product, index) => (
          <CardNew key={`${product.title}-${index}`} product={product} />
        ))}
      </div>
    </section>
  );
}