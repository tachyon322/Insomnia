import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenuCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  display_order: number;
}

interface MenuImage {
  id: string;
  category_id: string;
  image_url: string;
  display_order: number;
}

export const MenuManager = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [images, setImages] = useState<MenuImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<Partial<MenuCategory>>({
    title: "",
    icon: "Utensils",
    description: "",
    display_order: 0,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await (supabase as any)
        .from("menu_categories")
        .select("*")
        .order("display_order");

      if (categoriesError) throw categoriesError;

      const { data: imagesData, error: imagesError } = await (supabase as any)
        .from("menu_images")
        .select("*")
        .order("display_order");

      if (imagesError) throw imagesError;

      setCategories((categoriesData || []) as MenuCategory[]);
      setImages((imagesData || []) as MenuImage[]);
      if (categoriesData && categoriesData.length > 0) {
        setSelectedCategory(categoriesData[0].id);
      }
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
      const { error: uploadError } = await (supabase.storage as any)
        .from("menu")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = (supabase.storage as any)
        .from("menu")
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error: any) {
      toast({
        title: "Ошибка загрузки изображения",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSaveCategory = async () => {
    if (!editingCategory.title || !editingCategory.description) {
      toast({
        title: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingCategory.id) {
        const { error } = await (supabase as any)
          .from("menu_categories")
          .update(editingCategory)
          .eq("id", editingCategory.id);

        if (error) throw error;
      } else {
        const { error } = await (supabase as any)
          .from("menu_categories")
          .insert(editingCategory);

        if (error) throw error;
      }

      toast({
        title: "Успешно сохранено",
      });

      setEditingCategory({
        title: "",
        icon: "Utensils",
        description: "",
        display_order: 0,
      });
      loadData();
    } catch (error: any) {
      toast({
        title: "Ошибка сохранения",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUploadImages = async () => {
    if (!selectedCategory || imageFiles.length === 0) {
      toast({
        title: "Выберите категорию и изображения",
        variant: "destructive",
      });
      return;
    }

    try {
      for (const file of imageFiles) {
        const imageUrl = await handleImageUpload(file);
        if (imageUrl) {
          await (supabase as any).from("menu_images").insert({
            category_id: selectedCategory,
            image_url: imageUrl,
            display_order: 0,
          });
        }
      }

      toast({
        title: "Изображения загружены",
      });

      setImageFiles([]);
      loadData();
    } catch (error: any) {
      toast({
        title: "Ошибка загрузки",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Удалить категорию и все её изображения?")) return;

    try {
      const { error } = await (supabase as any).from("menu_categories").delete().eq("id", id);
      if (error) throw error;

      toast({
        title: "Категория удалена",
      });
      loadData();
    } catch (error: any) {
      toast({
        title: "Ошибка удаления",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Удалить изображение?")) return;

    try {
      const { error } = await (supabase as any).from("menu_images").delete().eq("id", id);
      if (error) throw error;

      toast({
        title: "Изображение удалено",
      });
      loadData();
    } catch (error: any) {
      toast({
        title: "Ошибка удаления",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getCategoryImages = (categoryId: string) => {
    return images.filter((img) => img.category_id === categoryId);
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
            {editingCategory.id ? "Редактировать категорию" : "Добавить категорию"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Название (например: Основное меню)"
            value={editingCategory.title || ""}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, title: e.target.value })
            }
            className="bg-deep-black/50 border-gold/30 text-cream"
          />
          <Textarea
            placeholder="Описание"
            value={editingCategory.description || ""}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, description: e.target.value })
            }
            className="bg-deep-black/50 border-gold/30 text-cream"
          />
          <Select
            value={editingCategory.icon || "Utensils"}
            onValueChange={(value) =>
              setEditingCategory({ ...editingCategory, icon: value })
            }
          >
            <SelectTrigger className="bg-deep-black/50 border-gold/30 text-cream">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Utensils">Приборы</SelectItem>
              <SelectItem value="Wine">Бокал</SelectItem>
              <SelectItem value="Coffee">Кофе</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Порядок отображения"
            value={editingCategory.display_order || 0}
            onChange={(e) =>
              setEditingCategory({
                ...editingCategory,
                display_order: parseInt(e.target.value),
              })
            }
            className="bg-deep-black/50 border-gold/30 text-cream"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSaveCategory}
              className="bg-gold hover:bg-rose-gold text-deep-black"
            >
              <Plus className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
            {editingCategory.id && (
              <Button
                onClick={() =>
                  setEditingCategory({
                    title: "",
                    icon: "Utensils",
                    description: "",
                    display_order: 0,
                  })
                }
                variant="outline"
                className="border-gold/30 text-rose-gold"
              >
                Отмена
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-wine/40 border-gold/30">
        <CardHeader>
          <CardTitle className="text-cream">Добавить изображения</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-deep-black/50 border-gold/30 text-cream">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
            className="bg-deep-black/50 border-gold/30 text-cream"
          />
          <Button
            onClick={handleUploadImages}
            className="bg-gold hover:bg-rose-gold text-deep-black"
          >
            <Plus className="w-4 h-4 mr-2" />
            Загрузить изображения
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {categories.map((category) => (
          <Card key={category.id} className="bg-wine/40 border-gold/30">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-display text-cream">{category.title}</h3>
                  <p className="text-cream/80">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingCategory(category)}
                    className="border-gold/30 text-rose-gold"
                  >
                    Изменить
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="border-gold/30 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getCategoryImages(category.id).map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.image_url}
                      alt="Menu"
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteImage(image.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
