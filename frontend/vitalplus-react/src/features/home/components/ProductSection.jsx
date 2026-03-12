import { Card } from "@/shared";

import tylenol from "@/assets/images/tylenol.jpg";
import noxpirin from "@/assets/images/noxpirin.png";
import dolex from "@/assets/images/dolex.png";
import noraver from "@/assets/images/noraver.png";

const products = [
  {
    title: "Tylenol",
    image: tylenol,
    price: 12000,
    description: "Analgésico para aliviar dolor y fiebre.",
  },
  {
    title: "Noxpirin",
    image: noxpirin,
    price: 14500,
    description: "Alivio rápido para síntomas de la gripa.",
  },
  {
    title: "Dolex Gripa",
    image: dolex,
    price: 13500,
    description: "Medicamento para congestión y malestar general.",
  },
  {
    title: "Noraver Gripa",
    image: noraver,
    price: 11000,
    description: "Ayuda a reducir síntomas gripales comunes.",
  },
];

export default function ProductSection() {
  return (
    <section className="w-full px-4 py-10">
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
        {products.map((product, index) => (
          <Card key={`${product.title}-${index}`} product={product} />
        ))}
      </div>
    </section>
  );
}