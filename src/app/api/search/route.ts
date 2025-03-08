import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const page = searchParams.get("page") || "1";

  if (!query) {
    return NextResponse.json({ photos: [], total_results: 0 });
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=15&size=large`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY as string,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to search images");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to search images: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    );
  }
}
