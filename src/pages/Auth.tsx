import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import logoKeyhole from "@/assets/logo-keyhole.png";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/admin");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert login to email format
      const loginEmail = email.includes('@') ? email : `${email.toLowerCase()}@admin.local`;
      
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: loginEmail,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });

        if (error) throw error;

        toast({
          title: "Регистрация успешна!",
          description: "Вы можете войти в систему.",
        });
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password,
        });

        if (error) throw error;

        toast({
          title: "Вход выполнен",
          description: "Добро пожаловать в админ-панель!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-deep-black via-forest to-deep-black p-4">
      <Card className="w-full max-w-md bg-wine/40 border-gold/30 backdrop-blur-sm">
        <CardHeader className="text-center">
          <img src={logoKeyhole} alt="Бессонница" className="w-16 h-16 mx-auto mb-4" />
          <CardTitle className="text-2xl font-display text-cream">
            {isSignUp ? "Регистрация" : "Вход в систему"}
          </CardTitle>
          <CardDescription className="text-rose-gold">
            Админ-панель ресторана
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
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
              {isSignUp ? "Зарегистрироваться" : "Войти"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full text-rose-gold hover:text-gold"
            >
              {isSignUp ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Регистрация"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
