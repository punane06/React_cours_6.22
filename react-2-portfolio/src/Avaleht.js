import { Link } from "react-router-dom";

function Avaleht() {
  return (
    <div className="home">
      <img
        className="hero-image"
        src={require("./assets/images/hero_image.jpg")}
        alt=""
      />
      <div className="home-text">
        Hello! Here you can find some superhearos.
      </div>
      <div className="home-line"></div>
      <div className="home-images-container">
        <Link to="/superman">
          <img
            className="hero-image"
            z
            src={require("./assets/images/superman.png")}
            alt=""
          />
        </Link>
        <Link to="/spiderman">
          <img
            className="hero-image"
            src={require("./assets/images/spiderman.png")}
            alt=""
          />
        </Link>

        <Link to="/batman">
          <img
            className="hero-image"
            src={require("./assets/images/batman.gif")}
            alt=""
          />
        </Link>
      </div>
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/cfVY9wLKltA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default Avaleht;
