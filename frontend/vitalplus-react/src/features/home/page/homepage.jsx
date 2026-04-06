import { useEffect, useState } from "react";
import { ProductSection } from "@/features/products";
import{Modal} from "@/shared/";
import MenuBar from "@/features/home/components/MenuBar";
import Carousel from "@/features/home/components/Carousel";

import img1 from "@/assets/images/banners/slide-1.webp";
import img2 from "@/assets/images/banners/slide-2.webp";
import img3 from "@/assets/images/banners/slide-3.webp";
import img4 from "@/assets/images/banners/slide-4.webp";
import img5 from "@/assets/images/banners/slide-5.webp";
import img6 from "@/assets/images/banners/slide-6.webp";
import img7 from "@/assets/images/banners/slide-7.webp";
import img8 from "@/assets/images/banners/slide-8.webp";


export default function HomePage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {setOpen(true)}, []);

  const slides = [img1,img2,img3,img4,img5,img6,img7,img8];

  return (
    <section className="w-full pt-8 ">

          {/*//============================ Carousel de Publicidad ========================== */}
          <div className="flex w-full sm:h-70 lg:h-88 2xl:h-133 justify-center  overflow-hidden mb-10">
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

      {/* MenuBar */}
      <div className="w-full">
        <MenuBar />
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <ProductSection variant="client"  />
      </div>

  
      {/* //================= MODAL ================= */}
      <Modal 
      isOpen={open} 
      onClose={() => setOpen(false)} 
      title="Bienvenido">
        <p>Tu farmacia de confianza, VitalPlus</p>
      </Modal>
    </section>
  );
}
