import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <p>
        2026 Steven Blanco · <Link to="/privacy">Privacy</Link>
      </p>
    </footer>
  );
}

export default Footer;
