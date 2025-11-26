import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMenu = () => {
    const element = document.getElementById("menu");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/60 via-deep-black/40 to-deep-black" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-cream mb-6 text-shadow-gold tracking-wide animate-fade-in">
          БЕССОННИЦА
        </h1>
        <p className="text-xl md:text-2xl text-cream mb-8 font-serif italic animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Место, где ночь становится вкусной
        </p>
        <p className="text-lg text-cream/90 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.4s" }}>
          Ресторан «Бессонница» — место, где встречаются искусство, история и гастрономия.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: "0.6s" }}>
          <Button
            onClick={scrollToMenu}
            size="lg"
            className="bg-wine hover:bg-wine/80 text-cream border border-gold/40 transition-all duration-300 mystical-glow hover:scale-110 text-lg px-8 py-6 relative overflow-hidden group"
          >
            <span className="relative z-10">Посмотреть меню</span>
            <div className="absolute inset-0 shimmer-bg animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          <Button
            onClick={scrollToBooking}
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-deep-black transition-all duration-300 hover:scale-110 text-lg px-8 py-6 hover:shadow-lg hover:shadow-gold/50"
          >
            Забронировать столик
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold/50 rounded-full mt-2 animate-glow" />
        </div>
      </div>
    </section>
  );
};
