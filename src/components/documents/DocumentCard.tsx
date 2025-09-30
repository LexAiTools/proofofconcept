import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { DownloadButton } from "./DownloadButton";
import { Document } from "@/hooks/useDocuments";

interface DocumentCardProps {
  document: Document;
}

const formatFileSize = (bytes: number | null): string => {
  if (!bytes) return "N/A";
  const mb = bytes / (1024 * 1024);
  return mb < 1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(1)} MB`;
};

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const fileName = document.file_path.split("/").pop() || "document.pdf";
  
  return (
    <Card className="border-border bg-card hover:shadow-glow transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg mb-2">{document.title}</CardTitle>
              {document.description && (
                <CardDescription className="line-clamp-2">
                  {document.description}
                </CardDescription>
              )}
            </div>
          </div>
          <DownloadButton 
            filePath={document.file_path}
            fileName={fileName}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {document.file_size && (
            <Badge variant="secondary" className="font-normal">
              {formatFileSize(document.file_size)}
            </Badge>
          )}
          <span>{document.download_count} pobrań</span>
        </div>
      </CardContent>
    </Card>
  );
};
