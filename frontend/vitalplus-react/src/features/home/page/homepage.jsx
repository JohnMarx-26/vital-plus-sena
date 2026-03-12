import { useEffect, useState } from "react";
import ProductSection from "@/features/home/components/ProductSection";
import Modal from "@/shared/components/Modal";
import MenuBar from "@/features/home/components/MenuBar";
import Carousel from "@/features/home/components/Carousel";

import img1 from "@/assets/images/imagen-2.png";
import img2 from "@/assets/images/imagen-3.png";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const slides = [img1, img2];

  return (
    <section className="w-full pt-16">
      {/* Carousels */}
      <div className="w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Carousel 1 */}
          <div className="w-full h-[260px] sm:h-[320px] lg:h-[350px] overflow-hidden rounded-lg">
            <Carousel autoSlide={true} autoSlideInterval={5000}>
              {slides.map((src, idx) => (
                <img
                  key={`c1-${idx}`}
                  src={src}
                  alt={`slide-${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              ))}
            </Carousel>
          </div>

          {/* Carousel 2 */}
          <div className="w-full h-[260px] sm:h-[320px] lg:h-[350px] overflow-hidden rounded-lg">
            <Carousel autoSlide={true} autoSlideInterval={5000}>
              {slides.map((src, idx) => (
                <img
                  key={`c2-${idx}`}
                  src={src}
                  alt={`slide-${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-6" />

      {/* MenuBar */}
      <div className="w-full">
        <MenuBar />
      </div>
      
      <ProductSection />

      {/* Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Bienvenido">
        <p>Tu farmacia de confianza, VitalPlus</p>
      </Modal>
    </section>
  );
}