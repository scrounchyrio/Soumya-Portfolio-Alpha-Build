import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { GalleryItem } from "../../../../site.config";

const supportedExtensions = new Set([".avif", ".jpg", ".jpeg", ".png", ".webp"]);

export const dynamic = "force-dynamic";

export async function GET() {
  const imagesDirectory = path.join(process.cwd(), "public", "images", "portfolio");

  try {
    const files = await fs.readdir(imagesDirectory, { withFileTypes: true });
    const images: GalleryItem[] = files
      .filter(
        (file) =>
          file.isFile() &&
          supportedExtensions.has(path.extname(file.name).toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((file) => {
        const title = path
          .parse(file.name)
          .name.replace(/[-_]+/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .replace(/\b\w/g, (letter) => letter.toUpperCase());

        return {
          id: `folder-${file.name}`,
          title,
          medium: "Portfolio image",
          year: String(new Date().getFullYear()),
          category: "editorial",
          description: "Added from public/images/portfolio.",
          aspectRatio: "square",
          image: `/images/portfolio/${encodeURIComponent(file.name)}`,
          tags: [],
        };
      });

    return NextResponse.json(
      { images },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Failed to read portfolio images:", error);
    return NextResponse.json(
      { error: "Failed to load portfolio images" },
      { status: 500 }
    );
  }
}
