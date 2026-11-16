import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const filePath = path.join(process.cwd(), "data", "linkedin.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContents);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Failed to read linkedin data:", error);
    return NextResponse.json(
      { error: "Failed to load LinkedIn feed", posts: [] },
      { status: 500 }
    );
  }
}
