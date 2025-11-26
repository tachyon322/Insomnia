import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Music, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: string;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
}

const iconMap: Record<string, any> = {
  Music,
  Sparkles,
  Calendar,
};

export const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [visibleEvents, setVisibleEvents] = useState<number[]>([]);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("events")
        .select("*")
        .eq("is_active", true)
        .order("display_order");

      if (error) throw error;
      setEvents((data || []) as Event[]);
    } catch (error) {
      console.error("Error loading events:", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = eventRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1 && !visibleEvents.includes(index)) {
              setTimeout(() => {
                setVisibleEvents((prev) => [...prev, index]);
              }, index * 200);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    eventRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [events]);

  return (
    <section id="events" className="py-20 px-4 bg-gradient-to-b from-deep-black via-forest to-deep-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-10 w-40 h-40 bg-wine/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display text-cream mb-4 text-shadow-gold">
            Афиша мероприятий
          </h2>
          <p className="text-rose-gold text-lg mb-4">
            Особенные вечера для особенных гостей
          </p>
          <a
            href="https://t.me/bessonnitsa_msk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-rose-gold transition-colors duration-300 text-lg font-semibold"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-1.969 9.308-2.783 12.348-.344 1.288-.999 1.717-1.636 1.76-.875.081-1.539-.579-2.388-1.134-1.329-.868-2.082-1.409-3.373-2.256-1.493-.979-.525-1.518.326-2.399.223-.231 4.101-3.758 4.174-4.078.009-.04.017-.19-.071-.27-.088-.08-.218-.052-.312-.031-.133.031-2.251 1.431-6.357 4.198-.602.414-1.147.616-1.635.606-.538-.011-1.573-.304-2.343-.554-.943-.307-1.693-.469-1.627-.989.034-.271.41-.548 1.129-.832 4.422-1.927 7.37-3.198 8.846-3.815 4.213-1.763 5.088-2.066 5.655-2.076.126-.002.406.029.588.177.154.125.196.293.216.412.02.119.045.39.025.602z"/>
            </svg>
            Наш Telegram-канал
          </a>
        </div>

        {events.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-wine/40 border-gold/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <p className="text-cream/90 text-lg leading-relaxed">
                  Все активные мероприятия вы можете посмотреть в нашем{" "}
                  <a
                    href="https://t.me/bessonnitsa_msk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-rose-gold transition-colors duration-300 font-semibold"
                  >
                    Telegram-канале
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {events.map((event, index) => {
            const Icon = iconMap[event.icon] || Sparkles;
            return (
              <div
                key={event.id}
                ref={(el) => (eventRefs.current[index] = el)}
                className={`transition-all duration-500 ${
                  visibleEvents.includes(index)
                    ? index % 2 === 0
                      ? "animate-fade-in-left"
                      : "animate-fade-in-right"
                    : "opacity-0"
                }`}
              >
                <Card className="bg-wine/40 border-gold/30 backdrop-blur-sm hover:border-gold/70 transition-all duration-500 group hover-lift">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-12 h-12 text-gold mx-auto mb-4 group-hover:scale-110 group-hover:animate-glow transition-transform duration-300" />
                    <div className="text-rose-gold text-sm font-semibold mb-2 group-hover:text-gold transition-colors duration-300">
                      {event.date}
                    </div>
                    <h3 className="text-2xl font-display text-cream mb-3 group-hover:text-rose-gold transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-cream/80">{event.description}</p>
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="mt-4 w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
          </div>
        )}
      </div>
    </section>
  );
};
