import { useState, useRef } from "react";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500); // 500ms delay
  };

  return (
    <nav className="site-nav">
      <ul className="nav-list">
        <li>
          <a href="#hero">Home</a>
        </li>
        <li
          className={`nav-item nav-item--dropdown ${isDropdownOpen ? "is-open" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
        >
          <a href="#projects">Projects</a>
          <ul className="dropdown-menu" aria-label="Projects submenu">
            <li>
              <a href="#project-1">Project 1</a>
            </li>
            <li>
              <a href="#project-2">Project 2</a>
            </li>
            <li>
              <a href="#project-3">Project 3</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#resume">Resume</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
