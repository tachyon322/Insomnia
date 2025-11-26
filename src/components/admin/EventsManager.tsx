import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export const EventsManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Partial<Event>>({
    date: "",
    title: "",
    description: "",
    icon: "Music",
    is_active: true,
    display_order: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const result = await (supabase as any)
        .from("events")
        .select("*")
        .order("display_order");

      if (result.error) throw result.error;
      setEvents((result.data || []) as Event[]);
    } catch (error: any) {
      toast({
        title: "Ошибка загрузки",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const uploadResult = await (supabase.storage as any)
        .from("events")
        .upload(fileName, file);

      if (uploadResult.error) throw uploadResult.error;

      const urlResult = (supabase.storage as any)
        .from("events")
        .getPublicUrl(fileName);

      return urlResult.data.publicUrl;
    } catch (error: any) {
      toast({
        title: "Ошибка загрузки изображения",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSave = async () => {
    if (!editingEvent.date || !editingEvent.title || !editingEvent.description) {
      toast({
        title: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    try {
      let imageUrl = editingEvent.image_url;

      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      const eventData = {
        ...editingEvent,
        image_url: imageUrl,
      };

      if (editingEvent.id) {
        const result = await (supabase as any)
          .from("events")
          .update(eventData)
          .eq("id", editingEvent.id);

        if (result.error) throw result.error;
      } else {
        const result = await (supabase as any).from("events").insert(eventData);
        if (result.error) throw result.error;
      }

      toast({
        title: "Успешно сохранено",
      });

      setEditingEvent({
        date: "",
        title: "",
        description: "",
        icon: "Music",
        is_active: true,
        display_order: 0,
      });
      setImageFile(null);
      loadEvents();
    } catch (error: any) {
      toast({
        title: "Ошибка сохранения",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить событие?")) return;

    try {
      const result = await (supabase as any).from("events").delete().eq("id", id);
      if (result.error) throw result.error;

      toast({
        title: "Событие удалено",
      });
      loadEvents();
    } catch (error: any) {
      toast({
        title: "Ошибка удаления",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (event: Event) => {
    try {
      // Проверяем количество активных событий
      const activeCount = events.filter(e => e.is_active && e.id !== event.id).length;
      
      if (!event.is_active && activeCount >= 4) {
        toast({
          title: "Максимум активных событий",
          description: "Можно активировать не более 4 событий одновременно",
          variant: "destructive",
        });
        return;
      }

      const result = await (supabase as any)
        .from("events")
        .update({ is_active: !event.is_active })
        .eq("id", event.id);

      if (result.error) throw result.error;
      loadEvents();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-wine/40 border-gold/30">
        <CardHeader>
          <CardTitle className="text-cream">
            {editingEvent.id ? "Редактировать событие" : "Добавить событие"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Дата (например: 20 и 26 ноября)"
            value={editingEvent.date || ""}
            onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
            className="bg-deep-black/50 border-gold/30 text-cream"
          />
          <Input
            placeholder="Название"
            value={editingEvent.title || ""}
            onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
            className="bg-deep-black/50 border-gold/30 text-cream"
          />
          <Textarea
            placeholder="Описание"
            value={editingEvent.description || ""}
            onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
            className="bg-deep-black/50 border-gold/30 text-cream"
          />
          <Select
            value={editingEvent.icon || "Music"}
            onValueChange={(value) => setEditingEvent({ ...editingEvent, icon: value })}
          >
            <SelectTrigger className="bg-deep-black/50 border-gold/30 text-cream">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Music">Музыка</SelectItem>
              <SelectItem value="Sparkles">Особое событие</SelectItem>
              <SelectItem value="Calendar">Календарь</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="bg-deep-black/50 border-gold/30 text-cream"
          />
          <Input
            type="number"
            placeholder="Порядок отображения"
            value={editingEvent.display_order || 0}
            onChange={(e) =>
              setEditingEvent({ ...editingEvent, display_order: parseInt(e.target.value) })
            }
            className="bg-deep-black/50 border-gold/30 text-cream"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="bg-gold hover:bg-rose-gold text-deep-black"
            >
              <Plus className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
            {editingEvent.id && (
              <Button
                onClick={() => {
                  setEditingEvent({
                    date: "",
                    title: "",
                    description: "",
                    icon: "Music",
                    is_active: true,
                    display_order: 0,
                  });
                  setImageFile(null);
                }}
                variant="outline"
                className="border-gold/30 text-rose-gold"
              >
                Отмена
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="bg-wine/40 border-gold/30">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-display text-cream">{event.title}</h3>
                  <p className="text-rose-gold text-sm">{event.date}</p>
                  <p className="text-cream/80 mt-2">{event.description}</p>
                  {event.image_url && (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="mt-2 h-32 object-cover rounded"
                    />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(event)}
                    className="border-gold/30"
                  >
                    {event.is_active ? (
                      <Eye className="w-4 h-4 text-gold" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingEvent(event);
                      setImageFile(null);
                    }}
                    className="border-gold/30 text-rose-gold"
                  >
                    Изменить
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(event.id)}
                    className="border-gold/30 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
