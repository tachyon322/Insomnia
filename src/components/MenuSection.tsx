import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Wine } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import menuFood1 from "@/assets/menu-food-1.jpg";
import menuFood2 from "@/assets/menu-food-2.jpg";
import menuBar1 from "@/assets/menu-bar-1.jpg";
import menuBar2 from "@/assets/menu-bar-2.jpg";
import menuBar3 from "@/assets/menu-bar-3.jpg";
import menuBar4 from "@/assets/menu-bar-4.jpg";

const menuCategories = [
  {
    title: "Основное меню",
    icon: Utensils,
    images: [menuFood1, menuFood2],
    description: "Завтраки, салаты, горячие блюда и паста",
  },
  {
    title: "Барное меню",
    icon: Wine,
    images: [menuBar1, menuBar2, menuBar3, menuBar4],
    description: "Коктейли, вино и крепкие напитки",
  },
];

export const MenuSection = () => {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  return (
    <section id="menu" className="py-20 px-4 bg-deep-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-rose-gold rounded-full animate-float" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display text-cream mb-4 text-shadow-gold">
            Наше меню
          </h2>
          <p className="text-rose-gold text-lg max-w-2xl mx-auto">
            Каждое блюдо — это история, рассказанная языком вкуса
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {menuCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card 
                    className="bg-card border-gold/20 overflow-hidden group hover:border-gold/60 transition-all duration-500 mystical-glow hover-lift cursor-pointer animate-scale-in"
                    onClick={() => setSelectedMenu(index)}
                  >
                    <div className="relative h-96 overflow-hidden">
                      <img
                        src={category.images[0]}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="w-8 h-8 text-gold group-hover:animate-glow" />
                          <h3 className="text-3xl font-display text-cream group-hover:text-rose-gold transition-colors duration-300">
                            {category.title}
                          </h3>
                        </div>
                        <p className="text-cream/80 text-sm group-hover:text-cream transition-colors duration-300">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-6 text-center">
                      <span className="text-gold font-semibold text-lg group-hover:text-rose-gold transition-colors duration-300">
                        Нажмите для просмотра →
                      </span>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-deep-black border-gold/30">
                  <div className="space-y-4 py-4">
                    <h3 className="text-3xl font-display text-cream text-center mb-6 text-shadow-gold">
                      {category.title}
                    </h3>
                    {category.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`${category.title} страница ${imgIndex + 1}`}
                        className="w-full rounded-lg border border-gold/20"
                      />
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </section>
  );
};
