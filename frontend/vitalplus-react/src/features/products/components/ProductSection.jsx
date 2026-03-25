import { CardClient } from "@/shared";
import { useNavigate } from "react-router-dom";

import tylenol from "@/assets/images/tylenol.jpg";
import noxpirin from "@/assets/images/noxpirin.png";
import dolex from "@/assets/images/dolex.png";
import noraver from "@/assets/images/noraver.png";
import aspirina100 from "@/assets/images/aspirina100.png";
import apronax550 from "@/assets/images/apronax550.png";
import advilmax from "@/assets/images/advil-max.png";
import dolorsin from "@/assets/images/dolorsin.png";
import buscapinafem from "@/assets/images/buscapinafem.png";
import allegra from "@/assets/images/allegra.png";
import ibuflash from "@/assets/images/ibuflash.png";
import algodon from "@/assets/images/algodon-jgb.png";

const products = [
  {
    id: 12154,
    lab: "GENOMMA COLOMBIA",
    title: "TYLENOL",
    image: tylenol,
    price: 18200,
    discount: 17290,
    stock: 1,
    description: `
    TYLENOL® Extra Fuerte — Alivio potente del dolor. Formulado con 500 mg de acetaminofén,
    actúa rápido para combatir dolores de cabeza intensos, dolores musculares, artritis y fiebre.
    Más potente que la fórmula regular, suave con el estómago.
    Consulte a su médico si tiene condiciones hepáticas o consume alcohol.`,
  },
  {
    id: 12155,
    lab: "TECNOQUIMICAS",
    title: "NOXPIRIN",
    image: noxpirin,
    price: 8500,
    stock: 320,
    description: `
    NOXPIRIN® — Alivio completo de la gripa. Combina analgésico,
    descongestionante y antihistamínico para tratar síntomas de gripa como fiebre,
    congestión nasal, dolor de cabeza y malestar general.
    Fórmula de acción rápida para recuperarte más pronto. No apto para menores sin indicación médica.`,
  },
  {
    id: 12156,
    lab: "BAYER",
    title: "ASPIRINA 100",
    image: aspirina100,
    price: 24600,
    discount: 21900,
    stock: 320,
    description: `
    ASPIRINA® 100 mg — Protección cardiovascular diaria.
    Dosis baja de ácido acetilsalicílico recomendada para la prevención de eventos cardiovasculares en pacientes de riesgo.
    Ayuda a inhibir la agregación plaquetaria. Uso exclusivo bajo prescripción médica.
    No automedicar en menores de edad.`,
  },
  {
    id: 12157,
    lab: "GRÜNENTHAL",
    title: "APRONAX 550MG",
    image: apronax550,
    price: 32400,
    stock: 320,
    description: `
    APRONAX® 550 mg — Alivio duradero del dolor. Contiene naproxeno sódico,
    un antiinflamatorio no esteroideo de acción prolongada. Ideal para dolores musculares,
    articulares, cólicos menstruales y dolor dental. Una sola tableta ofrece hasta 12 horas de alivio.
    Tomar con alimentos para proteger el estómago.`,
  },
  {
    id: 12158,
    lab: "PFIZER",
    title: "ADVIL MAX",
    image: advilmax,
    price: 15900,
    discount: 13500,
    stock: 320,
    description: `
    ADVIL® Max — Ibuprofeno de máxima potencia. Con 400 mg de ibuprofeno,
    ofrece alivio rápido y efectivo del dolor de cabeza,
    fiebre, dolor muscular e inflamación. Su fórmula líquida en cápsula permite una absorción más veloz que
    los comprimidos tradicionales. No exceda la dosis indicada.`,
  },
  {
    id: 12159,
    lab: "LAFRANCOL",
    title: "DOLORSIN",
    image: dolorsin,
    price: 12800,
    stock: 320,
    description: `
    DOLORSIN® — Analgésico y antipirético de confianza. 
    Formulado con dipirona magnésica para el alivio eficaz del dolor moderado a intenso y la reducción de la fiebre alta.
    De acción rápida y bien tolerado por el organismo. Indicado en adultos y niños mayores bajo supervisión médica.`,
  },
  {
    id: 12160,
    lab: "PROCAPS",
    title: "BUSCAPINA FEM",
    image: buscapinafem,
    price: 19500,
    discount: 16900,
    stock: 320,
    description: `
    BUSCAPINA FEM® — Alivio del dolor menstrual. 
    Combina butilhioscina y acetaminofén para tratar de forma efectiva los cólicos menstruales,
    el dolor pélvico y la tensión abdominal. Actúa sobre el espasmo muscular y el dolor simultáneamente.
    Diseñada especialmente para las necesidades de la mujer.`,
  },
  {
    id: 12161,
    lab: "SANOFI",
    title: "ALLEGRA 180MG",
    image: allegra,
    price: 65000,
    discount: 58500,
    stock: 320,
    description: `
    ALLEGRA® 180 mg — Antihistamínico sin somnolencia. Contiene fexofenadina, 
    indicado para el alivio de síntomas de rinitis alérgica estacional y urticaria crónica. 
    Una sola tableta al día controla el picor, estornudos, ojos llorosos y congestión nasal sin causar somnolencia. 
    Apto para uso prolongado.`,
  },
  {
    id: 12162,
    lab: "HALEON",
    title: "DOLEX GRIPA",
    image: dolex,
    price: 14200,
    stock: 320,
    description: `
    DOLEX® Gripa — Alivio integral de la gripa y el resfriado.
    Su fórmula combina acetaminofén, fenilefrina y clorfeniramina para tratar simultáneamente la fiebre,
    congestión nasal, dolor de cabeza y malestar general. 
    Presentación en tabletas de fácil ingesta. 
    No administrar con otros productos que contengan acetaminofén.`,
  },
  {
    id: 12163,
    lab: "TECNOQUIMICAS",
    title: "IBUFLASH",
    image: ibuflash,
    price: 7800,
    discount: 6900,
    stock: 320,
    description: `
    IBUFLASH® — Ibuprofeno de liberación rápida. 
    Formulado con ibuprofeno de sodio para una absorción hasta dos veces más rápida que el ibuprofeno convencional.
    Alivia el dolor de cabeza, muscular, dental y la fiebre en minutos. 
    Presentación en sobres efervescentes de fácil preparación y sabor agradable.`,
  },
  {
    id: 12164,
    lab: "JGB",
    title: "NORAVER GRIPA",
    image: noraver,
    price: 11200,
    stock: 320,
    description: `
    NORAVER® Gripa — Tratamiento completo para el resfriado. Contiene acetaminofén,
    clorfenamina y fenilefrina para combatir los síntomas más molestos de la gripa como fiebre,
    congestión, estornudos y dolor de cabeza. Fórmula económica y efectiva de laboratorios JGB.
    Indicado para adultos y niños mayores de 12 años.`,
  },
  {
    id: 12165,
    lab: "JGB",
    title: "ALGOBON 125g",
    image: algodon,
    price: 9300,
    discount: 8100,
    stock: 320,
    description: `
    ALGODÓN JGB® 125g — Algodón hidrófilo de uso médico. 
    Fibra de algodón 100% natural, altamente absorbente y suave con la piel. 
    Ideal para limpieza de heridas, aplicación de medicamentos tópicos y procedimientos de enfermería. 
    Certificado para uso clínico y doméstico. Presentación de 125 gramos en rollo compacto.`,
  },
];

export default function ProductSection({ variant, onSelectProduct }) {
  const navigate = useNavigate();

  const handleSelectProduct = (product) => {
    if (variant === "client") {
      navigate(`/products/${product.id}`, { state: { product } });
    } else {
      onSelectProduct?.(product);
    }
  };

  const handleComprar = (product) => {
    console.log("Agregando al carrito:", product);
  };

  return (
    <section className="w-full px-4 py-10">
      <div
        className="
        mx-auto max-w-7xl gap-y-3
        grid grid-cols-1 sm:grid-cols-2
        lg:grid-cols-3 xl:grid-cols-4 
        not-last:gap-6 place-items-center"
      >
        {products
          /*todos los productos con stock en cero no se mostraran en la tienda virtual
        pero si seran visibles desde apartado de ventas del farmaceuta*/
          .filter((product) =>
            variant === "client" ? product.stock > 0 : true
          )
          .map((product, index) => (
            <CardClient
              key={`${product.title} ${index}`}
              className="cursor-pointer hover:scale-[1.02] active:scale-95 transition-all w-full flex justify-center"
              variant={variant}
              product={product}
              onSelectProduct={handleSelectProduct}
              onComprar={variant === "client" ? handleComprar : undefined}
            />
          ))}
      </div>
    </section>
  );
}

