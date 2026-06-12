import { useState } from "react";
import { logEvent } from "./traffic";
import "./Header.css";

function Header() {
  const email = "stevenblanc521@gmail.com";
  const [copyStatus, setCopyStatus] = useState("Copy");

  const handleCopy = async () => {
    try {
      await logEvent("clicked_copy_email");
    } catch (error) {
      console.warn("Event logging failed", error);
    }

    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus("Copy"), 1500);
    } catch (error) {
      console.error("Copy failed", error);
      setCopyStatus("Try again");
      setTimeout(() => setCopyStatus("Copy"), 1500);
    }
  };

  return (
    <header className="site-header">
      <div className="header-left">
        <span className="contact-email">📧 {email}</span>
        <button
          type="button"
          className="copy-button"
          onClick={handleCopy}
          aria-label={`Copy ${email}`}
        >
          {copyStatus}
        </button>
      </div>
      <div className="header-right">
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </header>
  );
}

export default Header;
