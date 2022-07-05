import { Link } from "react-router-dom";

function Spiderman() {
  return (
    <div className="man">
      <br />
      <Link to="/">
        <button>Tagasi</button>
      </Link>
      <br />
      <br />
      <div>Spiderman</div>
    </div>
  );
}

export default Spiderman;
