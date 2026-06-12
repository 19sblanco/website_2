import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./aboutPage.css";

function AboutPage() {
  return (
    <div className="layout">
      <Header />
      <main className="main-content about-page">
        <section className="about-page-section">
          <div className="about-intro-row">
            <div className="about-photo-slot" aria-label="Headshot placeholder">
              <span className="about-photo-placeholder">Your photo</span>
            </div>

            <div className="about-intro-text">
              <p className="about-intro-label">About</p>
              <h1 className="about-name">Steven Blanco</h1>
              <p className="about-tagline">
                Full stack software engineer who enjoys building reliable web
                applications and learning new tools along the way.
              </p>
            </div>
          </div>

          <div className="about-long-description">
            <h2 className="about-long-heading">A little more about me</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum. Replace this block with your own story,
              background, and what you are looking for next.
            </p>
          </div>

          <Link to="/" className="about-back-link">
            ← Back to home
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
