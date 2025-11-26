import { MapPin, Phone, Clock } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-deep-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-wine/20 rounded-full blur-3xl animate-glow-pulse" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display text-cream mb-4 text-shadow-gold">
            Контакты
          </h2>
          <p className="text-rose-gold text-lg">
            Мы ждём вас каждый вечер
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start gap-4 hover-lift bg-forest/20 backdrop-blur-sm rounded-lg p-6 border border-gold/20 hover:border-gold/40 transition-all duration-500 group animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1 group-hover:animate-glow" />
              <div>
                <h3 className="text-cream font-semibold mb-1 group-hover:text-rose-gold transition-colors duration-300">Адрес</h3>
                <p className="text-cream/80">
                  Лесная улица, 59, стр. 1
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 hover-lift bg-forest/20 backdrop-blur-sm rounded-lg p-6 border border-gold/20 hover:border-gold/40 transition-all duration-500 group animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Clock className="w-6 h-6 text-gold flex-shrink-0 mt-1 group-hover:animate-glow" />
              <div>
                <h3 className="text-cream font-semibold mb-1 group-hover:text-rose-gold transition-colors duration-300">Часы работы</h3>
                <p className="text-cream/80">
                  Вт-Чт: 12:00 - 00:00
                  <br />
                  Пт-Сб: 12:00 - 01:00
                  <br />
                  Вс: 12:00 - 00:00
                  <br />
                  Пн: Выходной
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 hover-lift bg-forest/20 backdrop-blur-sm rounded-lg p-6 border border-gold/20 hover:border-gold/40 transition-all duration-500 group animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Phone className="w-6 h-6 text-gold flex-shrink-0 mt-1 group-hover:animate-glow" />
              <div>
                <h3 className="text-cream font-semibold mb-1 group-hover:text-rose-gold transition-colors duration-300">Телефон</h3>
                <a
                  href="tel:+79678886333"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  +7 (967) 888-63-33
                </a>
              </div>
            </div>

          </div>

          <div className="h-96 rounded-lg overflow-hidden border border-gold/20 hover:border-gold/40 transition-all duration-500 hover-lift animate-scale-in">
            <iframe
              src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=216487414973"
              width="100%"
              height="100%"
              frameBorder="0"
              className="grayscale hover:grayscale-0 transition-all duration-700"
              title="Карта расположения"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
