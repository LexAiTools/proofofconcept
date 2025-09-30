import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { downloadDocument } from "@/hooks/useDocuments";
import { toast } from "sonner";

interface DownloadButtonProps {
  filePath: string;
  fileName: string;
  variant?: "default" | "hero" | "outline" | "secondary" | "ghost" | "link" | "glass";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
}

export const DownloadButton = ({ 
  filePath, 
  fileName, 
  variant = "outline",
  size = "default" 
}: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadDocument(filePath, fileName);
      toast.success("Plik został pobrany");
    } catch (error) {
      toast.error("Błąd podczas pobierania pliku");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      variant={variant}
      size={size}
    >
      {isDownloading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Download className="w-4 h-4 mr-2" />
      )}
      {isDownloading ? "Pobieranie..." : "Pobierz"}
    </Button>
  );
};
