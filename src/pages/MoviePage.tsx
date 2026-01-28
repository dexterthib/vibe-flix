import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Movie } from "../data/movies";
import { getShowById } from "../api/tvmaze";

export default function MoviePage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  if (!Number.isFinite(id)) return;

  setLoading(true);
  setError(null);

  const controller = new AbortController();

  getShowById(id, controller.signal)
    .then((m) => setMovie(m))
    .catch((e: unknown) => {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError(e instanceof Error ? e.message : "Something went wrong");
    })
    .finally(() => setLoading(false));

  return () => controller.abort();
}, [id]);

  return (
    <div className="page" style={{ padding: 20 }}>
      <Link
        to="/"
        className="closeBtn"
        style={{ display: "inline-block", marginBottom: 14 }}
      >
        ← Back
      </Link>

      {loading && <div className="status">Loading…</div>}
      {error && <div className="status error">Error: {error}</div>}

      {!loading && !error && !movie && (
        <div className="status error">Not found.</div>
      )}

      {movie && (
        <div className="panel" style={{ margin: 0 }}>
          <div className="panelTop">
            <div>
              <div className="panelTitle">{movie.title}</div>
              <div className="panelMeta">
                <span>{movie.year || "—"}</span>
                <span className="dot">•</span>
                <span>{movie.genre}</span>
              </div>
            </div>
          </div>

          <p className="panelBody">{movie.description}</p>
        </div>
      )}
    </div>
  );
}
