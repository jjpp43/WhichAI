"use client";

import { useEffect, useRef, useState } from "react";
import { BlogPost } from "@/types/blog";

interface BlogEditorProps {
  initialData?: BlogPost;
  onSave: (data: any) => void;
  onPublish: (data: any) => void;
  isSaving?: boolean;
}

export function BlogEditor({
  initialData,
  onSave,
  onPublish,
  isSaving = false,
}: BlogEditorProps) {
  const editorRef = useRef<any>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only runs on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const initializeEditor = async () => {
      // Dynamically import Editor.js only on client side
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const Image = (await import("@editorjs/image")).default;
      const Quote = (await import("@editorjs/quote")).default;
      const Code = (await import("@editorjs/code")).default;
      const Table = (await import("@editorjs/table")).default;
      const Warning = (await import("@editorjs/warning")).default;
      const Delimiter = (await import("@editorjs/delimiter")).default;
      const InlineCode = (await import("@editorjs/inline-code")).default;

      // Import problematic plugins with type assertion
      const Embed = (await import("@editorjs/embed")).default as any;
      const Marker = (await import("@editorjs/marker")).default as any;
      const Underline = (await import("@editorjs/underline")).default as any;

      if (!editorRef.current) {
        const editor = new EditorJS({
          holder: "editorjs",
          placeholder: "Start writing your blog post...",
          autofocus: true,
          data: initialData?.content || { blocks: [] },
          tools: {
            header: {
              class: Header,
              config: {
                placeholder: "Enter a header",
                levels: [1, 2, 3, 4, 5, 6],
                defaultLevel: 2,
              },
            },
            list: {
              class: List,
              inlineToolbar: true,
              config: {
                defaultStyle: "unordered",
              },
            },
            paragraph: {
              class: Paragraph,
              inlineToolbar: true,
            },
            image: {
              class: Image,
              config: {
                uploader: {
                  uploadByFile: async (file: File) => {
                    try {
                      const formData = new FormData();
                      formData.append("file", file);

                      const response = await fetch("/api/blog/upload-image", {
                        method: "POST",
                        body: formData,
                      });

                      if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || "Upload failed");
                      }

                      const data = await response.json();

                      return {
                        success: 1,
                        file: {
                          url: data.url,
                        },
                      };
                    } catch (error: any) {
                      console.error("Image upload error:", error);
                      return {
                        success: 0,
                        error: error.message || "Failed to upload image",
                      };
                    }
                  },
                  uploadByUrl: async (url: string) => {
                    try {
                      return {
                        success: 1,
                        file: {
                          url: url,
                        },
                      };
                    } catch (error: any) {
                      console.error("URL upload error:", error);
                      return {
                        success: 0,
                        error: "Failed to process URL",
                      };
                    }
                  },
                },
              },
            },
            quote: {
              class: Quote,
              inlineToolbar: true,
              shortcut: "CMD+SHIFT+O",
              config: {
                quotePlaceholder: "Enter a quote",
                captionPlaceholder: "Quote's author",
              },
            },
            code: {
              class: Code,
              config: {
                placeholder: "Enter code",
              },
            },
            embed: {
              class: Embed,
              config: {
                services: {
                  youtube: true,
                  coub: true,
                  codepen: true,
                  instagram: true,
                  twitter: true,
                  vimeo: true,
                },
              },
            },
            table: {
              class: Table,
              inlineToolbar: true,
              config: {
                rows: 2,
                cols: 3,
              },
            },
            warning: {
              class: Warning,
              inlineToolbar: true,
              shortcut: "CMD+SHIFT+W",
              config: {
                titlePlaceholder: "Title",
                messagePlaceholder: "Message",
              },
            },
            delimiter: Delimiter,
            inlineCode: {
              class: InlineCode,
              shortcut: "CMD+SHIFT+M",
            },
            marker: {
              class: Marker,
              shortcut: "CMD+SHIFT+H",
            },
            underline: Underline,
          },
          onChange: () => {
            // Handle editor changes if needed
          },
        });

        editor.isReady.then(() => {
          setIsEditorReady(true);
        });

        editorRef.current = editor;
      }
    };

    initializeEditor();

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, [isMounted, initialData]);

  const handleSave = async () => {
    if (!editorRef.current) return;

    try {
      const outputData = await editorRef.current.save();
      onSave(outputData);
    } catch (error) {
      console.error("Error saving editor data:", error);
    }
  };

  const handlePublish = async () => {
    if (!editorRef.current) return;

    try {
      const outputData = await editorRef.current.save();
      onPublish(outputData);
    } catch (error) {
      console.error("Error publishing editor data:", error);
    }
  };

  // Don't render until mounted on client
  if (!isMounted) {
    return (
      <div className="w-full">
        <div className="min-h-[500px] p-4 border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-gray-500">Loading editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        id="editorjs"
        className="min-h-[500px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        style={{ width: "100%" }}
      />
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleSave}
          disabled={!isEditorReady || isSaving}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Draft"}
        </button>
        <button
          onClick={handlePublish}
          disabled={!isEditorReady || isSaving}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSaving ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
