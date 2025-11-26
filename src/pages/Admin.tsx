import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Loader2 } from "lucide-react";
import { EventsManager } from "@/components/admin/EventsManager";
import { MenuManager } from "@/components/admin/MenuManager";
import logoKeyhole from "@/assets/logo-keyhole.png";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data, error } = await (supabase as any)
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast({
          title: "Доступ запрещен",
          description: "У вас нет прав администратора",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-deep-black via-forest to-deep-black">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-black via-forest to-deep-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={logoKeyhole} alt="Бессонница" className="w-12 h-12" />
            <h1 className="text-3xl font-display text-cream">Админ-панель</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gold/30 text-rose-gold hover:bg-wine/40"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-wine/40 border border-gold/30">
            <TabsTrigger value="events" className="data-[state=active]:bg-gold data-[state=active]:text-deep-black">
              Афиша
            </TabsTrigger>
            <TabsTrigger value="menu" className="data-[state=active]:bg-gold data-[state=active]:text-deep-black">
              Меню
            </TabsTrigger>
          </TabsList>
          <TabsContent value="events" className="mt-8">
            <EventsManager />
          </TabsContent>
          <TabsContent value="menu" className="mt-8">
            <MenuManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
