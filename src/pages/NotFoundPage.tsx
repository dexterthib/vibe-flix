import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page" style={{ padding: 20 }}>
      <h1>404</h1>
      <p>That page doesn’t exist.</p>
      <Link
        to="/"
        className="closeBtn"
        style={{ display: "inline-block", marginTop: 10 }}
      >
        ← Back to home
      </Link>
    </div>
  );
}
