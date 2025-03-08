import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?page=${page}&per_page=15`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY as string,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();
    return NextResponse.json(data.photos);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to load more images: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    );
  }
}
