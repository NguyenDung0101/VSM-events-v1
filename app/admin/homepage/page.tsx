"use client";

import { useState, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GripVertical,
  Eye,
  Edit,
  Trash2,
  Plus,
  Save,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { HomepagePreview } from "@/components/admin/homepage-preview";
import { SectionEditor } from "@/components/admin/section-editor";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

interface SectionConfig {
  id: string;
  name: string;
  component: string;
  enabled: boolean;
  config: Record<string, any>;
}

const AVAILABLE_SECTIONS = [
  { id: "hero", name: "Hero Section", component: "HeroSection" },
  { id: "about", name: "About Section", component: "AboutSection" },
  { id: "events", name: "Events Section", component: "EventsSection" },
  { id: "news", name: "News Section", component: "NewsSection" },
  { id: "team", name: "Team Section", component: "TeamSection" },
  { id: "gallery", name: "Gallery Section", component: "GallerySection" },
  { id: "cta", name: "CTA Section", component: "CTASection" },
];

const DEFAULT_SECTIONS: SectionConfig[] = [
  {
    id: "hero",
    name: "Hero Section",
    component: "HeroSection",
    enabled: true,
    config: {},
  },
  {
    id: "about",
    name: "About Section",
    component: "AboutSection",
    enabled: true,
    config: {},
  },
  {
    id: "events",
    name: "Events Section",
    component: "EventsSection",
    enabled: true,
    config: {},
  },
  {
    id: "news",
    name: "News Section",
    component: "NewsSection",
    enabled: true,
    config: {},
  },
  {
    id: "team",
    name: "Team Section",
    component: "TeamSection",
    enabled: true,
    config: {},
  },
  {
    id: "gallery",
    name: "Gallery Section",
    component: "GallerySection",
    enabled: true,
    config: {},
  },
  {
    id: "cta",
    name: "CTA Section",
    component: "CTASection",
    enabled: true,
    config: {},
  },
];

export default function HomepageManagerPage() {
  const [sections, setSections] = useState<SectionConfig[]>(DEFAULT_SECTIONS);
  const [editingSection, setEditingSection] = useState<SectionConfig | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("manage");
  const [hasChanges, setHasChanges] = useState(false);
  const [isDevelopment, setIsDevelopment] = useState(false);

  useEffect(() => {
    // Check if we're in development mode
    setIsDevelopment(process.env.NODE_ENV === "development");

    // Load saved configuration from localStorage
    const saved = localStorage.getItem("homepage-config");
    if (saved) {
      try {
        setSections(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load saved configuration:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Auto-save to localStorage
    localStorage.setItem("homepage-config", JSON.stringify(sections));
  }, [sections]);

  const handleReorder = (newSections: SectionConfig[]) => {
    setSections(newSections);
    setHasChanges(true);
    toast.success("Sections reordered");
  };

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
    setHasChanges(true);
    toast.success("Section visibility updated");
  };

  const addSection = (sectionType: string) => {
    const template = AVAILABLE_SECTIONS.find((s) => s.id === sectionType);
    if (!template) return;

    const newSection: SectionConfig = {
      id: `${sectionType}-${Date.now()}`,
      name: template.name,
      component: template.component,
      enabled: true,
      config: {},
    };

    setSections((prev) => [...prev, newSection]);
    setHasChanges(true);
    toast.success("Section added");
  };

  const removeSection = (id: string) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
    setHasChanges(true);
    toast.success("Section removed");
  };

  const updateSection = (id: string, config: Record<string, any>) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, config } : section
      )
    );
    setHasChanges(true);
    setEditingSection(null);
    toast.success("Section updated");
  };

  const saveToFile = async () => {
    try {
      const enabledSections = sections.filter((s) => s.enabled);

      const imports = enabledSections
        .map(
          (section) =>
            `import { ${
              section.component
            } } from "@/components/home/${section.component
              .toLowerCase()
              .replace("section", "-section")}"`
        )
        .join("\n");

      const sectionComponents = enabledSections
        .map((section) => `        <${section.component} />`)
        .join("\n");

      const fileContent = `import { Navbar } from "@/components/layout/navbar"
${imports}
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
${sectionComponents}
      </main>
      <Footer />
    </div>
  )
}`;

      // In a real implementation, this would call an API endpoint to save the file
      const response = await fetch("/api/admin/save-homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: fileContent }),
      });

      if (response.ok) {
        setHasChanges(false);
        toast.success("Homepage saved successfully!");
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast.error("Failed to save homepage. Using localStorage for demo.");
      setHasChanges(false);
    }
  };

  const resetToDefault = () => {
    setSections(DEFAULT_SECTIONS);
    setHasChanges(true);
    toast.success("Reset to default configuration");
  };

  if (!isDevelopment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Development Only
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This homepage manager is only available in development mode for
              security reasons.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Homepage Manager</h1>
              <p className="text-muted-foreground">
                Manage your homepage sections with drag-and-drop
              </p>
            </div>
            <div className="flex gap-2">
              {hasChanges && (
                <Badge variant="secondary" className="mr-2">
                  Unsaved changes
                </Badge>
              )}
              <Button variant="outline" onClick={resetToDefault}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={saveToFile} disabled={!hasChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Manage Sections</TabsTrigger>
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Current Sections</h2>
                  <div className="text-sm text-muted-foreground">
                    Drag to reorder • Click to edit
                  </div>
                </div>

                <Reorder.Group
                  axis="y"
                  values={sections}
                  onReorder={handleReorder}
                  className="space-y-3"
                >
                  {sections.map((section) => (
                    <Reorder.Item
                      key={section.id}
                      value={section}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <Card
                        className={`${
                          section.enabled ? "bg-card" : "bg-muted/50"
                        } hover:shadow-md transition-shadow`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{section.name}</h3>
                                <Badge
                                  variant={
                                    section.enabled ? "default" : "secondary"
                                  }
                                >
                                  {section.enabled ? "Enabled" : "Disabled"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {section.component}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleSection(section.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingSection(section)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeSection(section.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Add Section</h2>
                <div className="space-y-2">
                  {AVAILABLE_SECTIONS.map((section) => (
                    <Button
                      key={section.id}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => addSection(section.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {section.name}
                    </Button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-2">Usage Guide</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Drag sections to reorder</li>
                    <li>• Toggle visibility with eye icon</li>
                    <li>• Edit content with edit icon</li>
                    <li>• Remove sections with trash icon</li>
                    <li>• Preview changes in Live Preview tab</li>
                    <li>• Save changes to update app/page.tsx</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <HomepagePreview sections={sections} />
          </TabsContent>
        </Tabs>
      </div>

      {editingSection && (
        <SectionEditor
          section={editingSection}
          onSave={(config) => updateSection(editingSection.id, config)}
          onClose={() => setEditingSection(null)}
        />
      )}
      <Toaster richColors position="top-right" />
    </div>
  );
}
