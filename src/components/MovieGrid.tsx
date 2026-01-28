import MovieCard from "./MovieCard";
import type { Movie } from "../data/movies";

type MovieGridProps = {
  movies: Movie[];
};

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <main className="gridWrap">
      <div className="gridHeader">
        <h2 className="sectionTitle">Titles</h2>
        <span className="count">{movies.length} titles</span>
      </div>

      <div className="grid">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      {movies.length === 0 && <div className="empty">No matches found.</div>}
    </main>
  );
}


