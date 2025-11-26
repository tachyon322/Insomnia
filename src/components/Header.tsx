import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-keyhole.png";

export const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-deep-black/90 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Бессонница логотип" className="w-10 h-10 object-contain animate-glow" />
            <h1 className="text-2xl md:text-3xl font-display text-cream tracking-wider">
              БЕССОННИЦА
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("menu")}
              className="text-cream hover:text-gold transition-colors duration-300"
            >
              Меню
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-cream hover:text-gold transition-colors duration-300"
            >
              Афиша
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-cream hover:text-gold transition-colors duration-300"
            >
              О нас
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-cream hover:text-gold transition-colors duration-300"
            >
              Контакты
            </button>
          </div>

          <Button
            asChild
            className="bg-wine hover:bg-wine/80 text-cream border border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
          >
            <a href="tel:+79678886333">Позвонить</a>
          </Button>
        </nav>
      </div>
    </header>
  );
};
