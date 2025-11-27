import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import logo from "@/assets/logo-keyhole.png";

export const Footer = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert login to email format
      const loginEmail = email.includes('@') ? email : `${email.toLowerCase()}@admin.local`;
      
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

      if (error) throw error;

      toast({
        title: "Вход выполнен",
        description: "Добро пожаловать в админ-панель!",
      });

      setIsLoginOpen(false);
      navigate("/admin");
    } catch (error: any) {
      toast({
        title: "Ошибка входа",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-deep-black border-t border-gold/20 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div 
            className="flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => setIsLoginOpen(true)}
          >
            <img src={logo} alt="Бессонница логотип" className="w-10 h-10 object-contain" />
            <div>
              <h3 className="text-xl font-display text-cream">Бессонница</h3>
              <p className="text-rose-gold text-sm">Ресторан</p>
            </div>
          </div>

          <Button
            onClick={scrollToBooking}
            className="bg-wine hover:bg-wine/80 text-cream border border-gold/30"
          >
            Забронировать столик
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-gold/10 text-center text-cream/60 text-sm">
          <p>© 2025 Ресторан «Бессонница». Все права защищены</p>
          <p className="mt-2">
            <a href="#" className="hover:text-gold transition-colors">
              Политика конфиденциальности
            </a>
          </p>
        </div>
      </div>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="bg-wine/95 border-gold/30 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-cream text-center">
              Вход в админ-панель
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div>
              <Input
                type="text"
                placeholder="Логин"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-deep-black/50 border-gold/30 text-cream"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-deep-black/50 border-gold/30 text-cream"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold hover:bg-rose-gold text-deep-black"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Войти
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </footer>
  );
};
