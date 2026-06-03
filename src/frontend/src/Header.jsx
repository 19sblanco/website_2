import "./Header.css";

function Header() {
  return (
    <header className="site-header">
      <div className="header-left">
        <span>📧 stevenblanco@example.com</span>
      </div>
      <div className="header-right">
        <a href="https://linkedin.com" target="_blank">
          LinkedIn
        </a>
        <a href="https://github.com" target="_blank">
          GitHub
        </a>
        <a href="https://instagram.com" target="_blank">
          IG
        </a>
      </div>
    </header>
  );
}

export default Header;
