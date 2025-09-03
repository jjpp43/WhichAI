import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Define the base path for logos
const LOGOS_DIR = path.join(process.cwd(), "public", "logos");

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { params } = context;
  const resolvedParams = await params;

  try {
    const imagePath = resolvedParams.path.join("/");
    const fullPath = path.join(LOGOS_DIR, imagePath);

    // Security check: prevent directory traversal
    const normalizedPath = path.normalize(fullPath);
    if (!normalizedPath.startsWith(LOGOS_DIR)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Check if file exists
    try {
      await fs.access(fullPath);
    } catch {
      return new NextResponse("Logo not found", { status: 404 });
    }

    // Read the image file
    const imageBuffer = await fs.readFile(fullPath);

    // Determine content type based on file extension
    const ext = path.extname(imagePath).toLowerCase();
    let contentType = "image/png"; // default

    switch (ext) {
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".webp":
        contentType = "image/webp";
        break;
      case ".svg":
        contentType = "image/svg+xml";
        break;
      case ".gif":
        contentType = "image/gif";
        break;
    }

    // Create response with proper headers
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET");
    headers.set("Access-Control-Allow-Headers", "Content-Type");

    return new NextResponse(new Uint8Array(imageBuffer), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error serving logo:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
