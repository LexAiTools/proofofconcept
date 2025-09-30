import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Podcast {
  id: string;
  episode_number: number;
  title: string;
  description: string;
  host_name: string;
  host_role: string;
  guest_name: string;
  guest_role: string;
  company: string;
  company_color: string;
  episode_date: string;
  youtube_url: string;
}

const AdminPodcasts = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState<Podcast | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    episode_number: "",
    title: "",
    description: "",
    host_name: "",
    host_role: "",
    guest_name: "",
    guest_role: "",
    company: "",
    company_color: "",
    episode_date: "",
    youtube_url: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const checkAdminRole = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking admin role:", error);
        navigate("/signin");
        return;
      }

      if (!data) {
        console.log("User is not an admin");
        navigate("/signin");
        return;
      }

      setIsAdmin(true);
      fetchPodcasts();
    };

    checkAdminRole();
  }, [user, navigate]);

  const fetchPodcasts = async () => {
    try {
      const { data, error } = await supabase
        .from("podcasts")
        .select("*")
        .order("episode_number", { ascending: false });

      if (error) throw error;
      setPodcasts(data || []);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load podcasts",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const podcastData = {
        episode_number: parseInt(formData.episode_number),
        title: formData.title,
        description: formData.description,
        host_name: formData.host_name,
        host_role: formData.host_role,
        guest_name: formData.guest_name,
        guest_role: formData.guest_role,
        company: formData.company,
        company_color: formData.company_color,
        episode_date: formData.episode_date,
        youtube_url: formData.youtube_url,
      };

      if (editingPodcast) {
        const { error } = await supabase
          .from("podcasts")
          .update(podcastData)
          .eq("id", editingPodcast.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Podcast updated successfully",
        });
      } else {
        const { error } = await supabase.from("podcasts").insert([podcastData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Podcast created successfully",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchPodcasts();
    } catch (error: any) {
      console.error("Error saving podcast:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save podcast",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this podcast?")) return;

    try {
      const { error } = await supabase.from("podcasts").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Podcast deleted successfully",
      });

      fetchPodcasts();
    } catch (error) {
      console.error("Error deleting podcast:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete podcast",
      });
    }
  };

  const handleEdit = (podcast: Podcast) => {
    setEditingPodcast(podcast);
    setFormData({
      episode_number: podcast.episode_number.toString(),
      title: podcast.title,
      description: podcast.description,
      host_name: podcast.host_name,
      host_role: podcast.host_role,
      guest_name: podcast.guest_name,
      guest_role: podcast.guest_role,
      company: podcast.company,
      company_color: podcast.company_color,
      episode_date: podcast.episode_date,
      youtube_url: podcast.youtube_url,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingPodcast(null);
    setFormData({
      episode_number: "",
      title: "",
      description: "",
      host_name: "",
      host_role: "",
      guest_name: "",
      guest_role: "",
      company: "",
      company_color: "",
      episode_date: "",
      youtube_url: "",
    });
  };

  const handleNewPodcast = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  if (!user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 p-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Podcast Management</h1>
                <p className="text-muted-foreground mt-2">Manage podcast episodes</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleNewPodcast}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Episode
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPodcast ? "Edit Episode" : "Add New Episode"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="episode_number">Episode Number</Label>
                        <Input
                          id="episode_number"
                          type="number"
                          value={formData.episode_number}
                          onChange={(e) =>
                            setFormData({ ...formData, episode_number: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="episode_date">Episode Date</Label>
                        <Input
                          id="episode_date"
                          type="date"
                          value={formData.episode_date}
                          onChange={(e) =>
                            setFormData({ ...formData, episode_date: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="title">Episode Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="host_name">Host Name</Label>
                        <Input
                          id="host_name"
                          value={formData.host_name}
                          onChange={(e) =>
                            setFormData({ ...formData, host_name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="host_role">Host Role</Label>
                        <Input
                          id="host_role"
                          value={formData.host_role}
                          onChange={(e) =>
                            setFormData({ ...formData, host_role: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="guest_name">Guest Name</Label>
                        <Input
                          id="guest_name"
                          value={formData.guest_name}
                          onChange={(e) =>
                            setFormData({ ...formData, guest_name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="guest_role">Guest Role</Label>
                        <Input
                          id="guest_role"
                          value={formData.guest_role}
                          onChange={(e) =>
                            setFormData({ ...formData, guest_role: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="company_color">
                          Company Color (Tailwind gradient)
                        </Label>
                        <Input
                          id="company_color"
                          value={formData.company_color}
                          onChange={(e) =>
                            setFormData({ ...formData, company_color: e.target.value })
                          }
                          placeholder="from-blue-500 to-purple-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="youtube_url">YouTube URL</Label>
                      <Input
                        id="youtube_url"
                        type="url"
                        value={formData.youtube_url}
                        onChange={(e) =>
                          setFormData({ ...formData, youtube_url: e.target.value })
                        }
                        placeholder="https://www.youtube.com/watch?v=..."
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingPodcast ? "Update" : "Create"} Episode
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid gap-4">
                {podcasts.map((podcast) => (
                  <Card key={podcast.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            Episode #{podcast.episode_number}: {podcast.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {podcast.guest_name} ({podcast.guest_role}) from {podcast.company}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Host: {podcast.host_name} ({podcast.host_role})
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Date: {new Date(podcast.episode_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(podcast)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(podcast.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        {podcast.description}
                      </p>
                      <a
                        href={podcast.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Watch on YouTube →
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminPodcasts;
