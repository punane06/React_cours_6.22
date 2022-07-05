import { Link } from "react-router-dom";

function Batman() {
  return (
    <div className="man">
      <br />
      <Link to="/">
        <button>Tagasi</button>
      </Link>
      <br />
      <br />
      <div>Batman</div>
    </div>
  );
}

export default Batman;
