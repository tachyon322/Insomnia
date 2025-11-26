import concertBanner from "@/assets/concert-banner.jpg";

export const ConcertBanner = () => {
  return (
    <section className="py-12 px-4 bg-deep-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-wine/30 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto relative z-10">
        <a
          href="https://bessonnitsa-org.timepad.ru/event/3678556/"
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-6xl mx-auto group"
        >
          <div className="relative overflow-hidden rounded-lg border border-gold/30 hover:border-gold/70 transition-all duration-500 hover-lift animate-fade-in">
            <img
              src={concertBanner}
              alt="Любовь Успенская - Эксклюзивный концерт 27 ноября"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </a>
      </div>
    </section>
  );
};
