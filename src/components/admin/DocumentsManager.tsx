import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useDocuments, Document } from "@/hooks/useDocuments";
import { Loader2, Upload, Trash2, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const DocumentsManager = () => {
  const { data: documents, isLoading, refetch } = useDocuments();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file || !formData.title) {
      toast.error("Wypełnij wszystkie wymagane pola");
      return;
    }

    setUploading(true);
    try {
      const fileExt = formData.file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, formData.file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from("documents")
        .insert({
          title: formData.title,
          description: formData.description || null,
          file_path: filePath,
          file_size: formData.file.size,
        });

      if (dbError) throw dbError;

      toast.success("Dokument został dodany");
      setFormData({ title: "", description: "", file: null });
      refetch();
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Błąd podczas przesyłania dokumentu");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (document: Document) => {
    if (!confirm(`Czy na pewno chcesz usunąć "${document.title}"?`)) return;

    try {
      const { error: storageError } = await supabase.storage
        .from("documents")
        .remove([document.file_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("documents")
        .delete()
        .eq("id", document.id);

      if (dbError) throw dbError;

      toast.success("Dokument został usunięty");
      refetch();
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Błąd podczas usuwania dokumentu");
    }
  };

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return "N/A";
    const mb = bytes / (1024 * 1024);
    return mb < 1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dodaj Nowy Dokument</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Tytuł *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Np. Instrukcja instalacji"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Opis
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Krótki opis dokumentu..."
                className="min-h-[80px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Plik PDF *
              </label>
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
            </div>

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Przesyłanie...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Dodaj Dokument
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dostępne Dokumenty</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : !documents || documents.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Brak dokumentów
            </p>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg bg-card"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <FileText className="w-5 h-5 text-primary mt-1" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium mb-1">{doc.title}</h4>
                      {doc.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {doc.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="font-normal">
                          {formatFileSize(doc.file_size)}
                        </Badge>
                        <span>{doc.download_count} pobrań</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(doc)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
