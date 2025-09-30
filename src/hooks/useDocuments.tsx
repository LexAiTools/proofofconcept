import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Document {
  id: string;
  title: string;
  description: string | null;
  file_path: string;
  file_size: number | null;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export const useDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Document[];
    },
  });
};

export const downloadDocument = async (filePath: string, fileName: string) => {
  try {
    const { data, error } = await supabase.storage
      .from("documents")
      .download(filePath);

    if (error) throw error;

    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Error downloading document:", error);
    throw error;
  }
};
