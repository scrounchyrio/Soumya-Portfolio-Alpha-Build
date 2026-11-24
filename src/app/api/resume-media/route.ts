import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { ResumeMediaItem, ResumeMediaMetadata } from "../../../lib/resume-media";

const supportedExtensions = new Set([
  ".avif",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".mp4",
  ".webm",
]);
const metadataFileName = "metadata.json";

export const dynamic = "force-dynamic";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readMetadata(directory: string): Promise<Record<string, ResumeMediaMetadata>> {
  let contents: string;
  try {
    contents = await fs.readFile(path.join(directory, metadataFileName), "utf8");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return {};
    throw error;
  }

  const parsed: unknown = JSON.parse(contents);
  if (!isRecord(parsed)) {
    throw new Error(`${metadataFileName} must contain an object keyed by media filename.`);
  }

  const metadata: Record<string, ResumeMediaMetadata> = {};
  for (const [fileName, value] of Object.entries(parsed)) {
    if (!isRecord(value)) {
      throw new Error(`Metadata for "${fileName}" must be an object.`);
    }

    const itemMetadata: ResumeMediaMetadata = {};
    for (const key of ["alt", "poster", "caption", "href"] as const) {
      const field = value[key];
      if (field !== undefined && typeof field !== "string") {
        throw new Error(`"${key}" for "${fileName}" must be a string.`);
      }
      if (typeof field === "string" && field.trim()) itemMetadata[key] = field.trim();
    }
    metadata[fileName] = itemMetadata;
  }

  return metadata;
}

function readableLabel(fileName: string): string {
  return path
    .parse(fileName)
    .name.replace(/^\d+[-_.\s]+/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export async function GET() {
  const mediaDirectory = path.join(process.cwd(), "public", "media", "resume-gallery");

  try {
    const [files, metadata] = await Promise.all([
      fs.readdir(mediaDirectory, { withFileTypes: true }),
      readMetadata(mediaDirectory),
    ]);

    const items: ResumeMediaItem[] = files
      .filter(
        (file) =>
          file.isFile() &&
          supportedExtensions.has(path.extname(file.name).toLowerCase())
      )
      .sort(
        (a, b) =>
          a.name.localeCompare(b.name, "en", { numeric: true, sensitivity: "base" }) ||
          a.name.localeCompare(b.name, "en", { numeric: true, sensitivity: "variant" })
      )
      .map((file) => {
        const label = readableLabel(file.name);
        const extension = path.extname(file.name).toLowerCase();
        return {
          id: file.name,
          src: `/media/resume-gallery/${encodeURIComponent(file.name)}`,
          type: extension === ".mp4" || extension === ".webm" ? "video" : "image",
          alt: label || "Portfolio media",
          ...metadata[file.name],
        };
      });

    return NextResponse.json(
      { items },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Failed to load resume media:", error);
    return NextResponse.json(
      { error: "Failed to load resume media" },
      { status: 500 }
    );
  }
}
