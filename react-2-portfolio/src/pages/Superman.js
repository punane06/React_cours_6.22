import { Link } from "react-router-dom";

function Superman() {
  return (
    <div className="man">
      <br />
      <Link to="/">
        <button>Tagasi</button>
      </Link>
      <br />
      <br />
      <div>Superman</div>
    </div>
  );
}

export default Superman;
