export async function fetchFeaturedImages(count = 12) {
  const response = await fetch(
    `https://api.pexels.com/v1/curated?per_page=${count}`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY as string,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }

  const data = await response.json();
  return data.photos;
}

export async function fetchImagesByCategory(category: string, count = 15) {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${category}&per_page=${count}`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY as string,
      },
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }

  const data = await response.json();
  return data.photos;
}

export async function fetchImageById(id: string) {
  const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY as string,
    },
    next: { revalidate: 86400 }, // Cache for 24 hours
  });

  if (!response.ok) {
    throw new Error("Failed to fetch image");
  }

  return response.json();
}

export async function searchImages(query: string, page = 1) {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=15`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY as string,
      },
      cache: "no-store", // Don't cache search results
    },
  );

  if (!response.ok) {
    throw new Error("Failed to search images");
  }

  return response.json();
}
