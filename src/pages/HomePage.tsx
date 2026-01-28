import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import MovieGrid from "../components/MovieGrid";
import type { Movie } from "../data/movies";
import { searchShows } from "../api/tvmaze";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial values from URL
  const initialQ = searchParams.get("q") ?? "girls";
  const initialGenre = searchParams.get("genre") ?? "All";

  const [query, setQuery] = useState(initialQ);
  const [activeGenre, setActiveGenre] = useState(initialGenre);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep URL in sync when query/genre changes
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (query.trim()) next.set("q", query.trim());
    else next.delete("q");

    if (activeGenre && activeGenre !== "All") next.set("genre", activeGenre);
    else next.delete("genre");

    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeGenre]);

  // Fetch when query changes (debounced + cancellable)
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setMovies([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const t = setTimeout(() => {
      searchShows(q, controller.signal)
        .then(setMovies)
        .catch((e: unknown) => {
          // Ignore abort errors
          if (e instanceof DOMException && e.name === "AbortError") return;
          setError(e instanceof Error ? e.message : "Something went wrong");
        })
        .finally(() => setLoading(false));
    }, 350);

    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [query]);

  const genres = useMemo(() => {
    const unique = Array.from(new Set(movies.map((m) => m.genre))).sort();
    return ["All", ...unique];
  }, [movies]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return movies.filter((m) => {
      const matchesQuery =
        q.length === 0 ||
        m.title.toLowerCase().includes(q) ||
        String(m.year).includes(q);
      const matchesGenre = activeGenre === "All" || m.genre === activeGenre;
      return matchesQuery && matchesGenre;
    });
  }, [movies, query, activeGenre]);

  return (
    <div className="page">
      <Header
        query={query}
        onQueryChange={setQuery}
        genres={genres}
        activeGenre={activeGenre}
        onGenreChange={setActiveGenre}
      />

      <section className="hero">
        <h1 className="heroTitle">Browse</h1>
        <p className="heroSub">
          Try: <code>office</code>, <code>friends</code>, <code>star</code>. Your search is now shareable in the URL.
        </p>
      </section>

      {loading && <div className="status">Loading…</div>}
      {error && <div className="status error">Error: {error}</div>}

      <MovieGrid movies={filtered} />
    </div>
  );
}
