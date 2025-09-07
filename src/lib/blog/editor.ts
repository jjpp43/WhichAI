import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Image from "@editorjs/image";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";

export const editorConfig = {
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
            } catch (error) {
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
            } catch (error) {
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
  placeholder: "Start writing your blog post...",
  autofocus: true,
};

export function createEditor(config: any) {
  return new EditorJS(config);
}
