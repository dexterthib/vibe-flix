import { Link } from "react-router-dom";

type HeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  genres: string[];
  activeGenre: string;
  onGenreChange: (value: string) => void;
};

export default function Header({
  query,
  onQueryChange,
  genres,
  activeGenre,
  onGenreChange,
}: HeaderProps) {
  return (
    <header className="topbar">
    <Link to="/" className="brandLink">
      <div className="brand">
        <span className="logoDot" />
        <span className="brandText">VibeFlix</span>
  </div>
</Link>

      <div className="controls">
        <input
          className="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by title or year…"
        />

        <select
          className="select"
          value={activeGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
