import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import interior3 from "@/assets/interior-3.jpg";
import interior4 from "@/assets/interior-4.jpg";
import interior5 from "@/assets/interior-5.jpg";
import interior6 from "@/assets/interior-6.jpg";
import interior7 from "@/assets/interior-7.jpg";
import interior8 from "@/assets/interior-8.jpg";

const galleryImages = [
  { src: interior1, alt: "Уютный столик в ресторане" },
  { src: interior2, alt: "Барная стойка с коктейлями" },
  { src: interior3, alt: "Интерьер с бархатными шторами" },
  { src: interior4, alt: "Столик у стены с росписью" },
  { src: interior5, alt: "Круглый стол с панорамой бара" },
  { src: interior6, alt: "Мистическая роспись на стене" },
  { src: interior7, alt: "Винтажный шкаф с декором" },
  { src: interior8, alt: "Столики с зелеными столешницами" },
];

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 px-4 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-40 h-40 border border-rose-gold rounded-full animate-float" />
        <div className="absolute bottom-10 left-20 w-32 h-32 border border-gold rounded-full animate-float-slow" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display text-cream mb-4 text-shadow-gold">
            Наш интерьер
          </h2>
          <p className="text-rose-gold text-lg max-w-2xl mx-auto">
            Погрузитесь в атмосферу истории и уюта
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {galleryImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div 
                  className="relative aspect-square overflow-hidden rounded-lg border border-gold/20 cursor-pointer group hover-lift animate-scale-in mystical-glow"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] bg-deep-black border-gold/30 p-2">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};
