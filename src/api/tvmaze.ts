import type { Movie } from "../data/movies";

type TvMazeSearchItem = {
  show: {
    id: number;
    name: string;
    genres: string[];
    premiered: string | null;
    summary: string | null;
    image: { medium?: string; original?: string } | null;
  };
};

// Simple in-memory cache (per browser session)
const searchCache = new Map<string, Movie[]>();

export async function searchShows(query: string, signal?: AbortSignal): Promise<Movie[]> {
  const key = query.trim().toLowerCase();
  if (searchCache.has(key)) return searchCache.get(key)!;

  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`TVMaze request failed: ${res.status}`);

  const data: TvMazeSearchItem[] = await res.json();

  const mapped: Movie[] = data.map((item) => {
    const s = item.show;
    const year = s.premiered ? Number(s.premiered.slice(0, 4)) : 0;
    const genre = s.genres?.[0] ?? "Unknown";
    const description =
      (s.summary ?? "").replace(/<[^>]*>/g, "").trim() || "No description available.";

    return { id: s.id, title: s.name, year, genre, description };
  });

  searchCache.set(key, mapped);
  return mapped;
}

export async function getShowById(id: number, signal?: AbortSignal): Promise<Movie> {
  const url = `https://api.tvmaze.com/shows/${id}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`TVMaze request failed: ${res.status}`);

  const s = await res.json();
  const year = s.premiered ? Number(String(s.premiered).slice(0, 4)) : 0;
  const genre = s.genres?.[0] ?? "Unknown";
  const description = (s.summary ?? "").replace(/<[^>]*>/g, "").trim();

  return {
    id: s.id,
    title: s.name,
    year,
    genre,
    description: description || "No description available.",
  };
}
