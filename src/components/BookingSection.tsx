import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const BookingSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: Number(formData.guests || 0),
      };

      const { data, error } = await supabase.functions.invoke("send-telegram-booking", {
        body: payload,
      });

      if (error) throw error;

      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время для подтверждения.",
      });
      setFormData({ name: "", phone: "", date: "", time: "", guests: "" });
    } catch (err: any) {
      console.error("Booking submit error:", err);
      toast({
        title: "Не удалось отправить",
        description: "Попробуйте ещё раз через минуту.",
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="booking" className="py-20 px-4 bg-gradient-to-b from-deep-black to-wine/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-1/4 w-40 h-40 border-2 border-gold rounded-full animate-float-slow" />
        <div className="absolute bottom-40 left-1/3 w-32 h-32 border-2 border-rose-gold rounded-full animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto max-w-2xl relative z-10">
        <Card className="bg-forest/60 border-gold/30 backdrop-blur-sm mystical-glow hover-lift animate-scale-in">
          <CardHeader className="text-center animate-fade-in">
            <CardTitle className="text-4xl font-display text-cream text-shadow-gold mb-2">
              Забронировать столик
            </CardTitle>
            <p className="text-rose-gold">
              Позвольте нам подготовить для вас особенный вечер
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <Label htmlFor="name" className="text-cream flex items-center gap-2">
                  <User className="w-4 h-4 text-gold" />
                  Ваше имя
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-deep-black/50 border-gold/20 text-cream focus:border-gold focus:shadow-lg focus:shadow-gold/20 transition-all duration-300"
                  placeholder="Имя"
                />
              </div>

              <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <Label htmlFor="phone" className="text-cream flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold" />
                  Телефон
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-deep-black/50 border-gold/20 text-cream focus:border-gold focus:shadow-lg focus:shadow-gold/20 transition-all duration-300"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <Label htmlFor="date" className="text-cream flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold" />
                    Дата
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="bg-deep-black/50 border-gold/20 text-cream focus:border-gold focus:shadow-lg focus:shadow-gold/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                  <Label htmlFor="time" className="text-cream flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold" />
                    Время
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="bg-deep-black/50 border-gold/20 text-cream focus:border-gold focus:shadow-lg focus:shadow-gold/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <Label htmlFor="guests" className="text-cream flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold" />
                  Количество гостей
                </Label>
                <Input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="bg-deep-black/50 border-gold/20 text-cream focus:border-gold focus:shadow-lg focus:shadow-gold/20 transition-all duration-300"
                  placeholder="1-20"
                />
              </div>

              <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <Button
                  type="submit"
                  className="w-full bg-wine hover:bg-wine/80 text-cream border border-gold/40 transition-all duration-300 mystical-glow hover:scale-105 text-lg py-6 relative overflow-hidden group"
                >
                  <span className="relative z-10">Отправить заявку</span>
                  <div className="absolute inset-0 shimmer-bg animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
