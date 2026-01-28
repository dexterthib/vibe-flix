import { Link } from "react-router-dom";
import type { Movie } from "../data/movies";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.id}`} className="cardLink">
      <article className="card">
        <div className="thumb">
          <div className="thumbText">{movie.title[0]}</div>
        </div>

        <div className="cardBody">
          <div className="cardTitle">{movie.title}</div>
          <div className="cardMeta">
            <span>{movie.year}</span>
            <span className="dot">•</span>
            <span>{movie.genre}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}


