import { useDocuments } from "@/hooks/useDocuments";
import { DocumentCard } from "./DocumentCard";
import { Loader2, FileText } from "lucide-react";

export const DocumentsSection = () => {
  const { data: documents, isLoading, error } = useDocuments();

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !documents || documents.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Dokumenty do Pobrania
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pobierz materiały, instrukcje i dokumentację dotyczącą naszej wtyczki WordPress AI.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-6">
          {documents.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      </div>
    </section>
  );
};
