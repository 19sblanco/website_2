import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import headshot from "./assets/headshot.JPG";
import "./aboutPage.css";

function AboutPage() {
  return (
    <div className="layout">
      <Header />
      <main className="main-content about-page">
        <section className="about-page-section">
          <div className="about-intro-row">
            <div className="about-photo-slot">
              <img src={headshot} alt="Steven Blanco" />
            </div>

            <div className="about-intro-text">
              <p className="about-intro-label">About</p>
              <p className="about-tagline">
                I'm a full stack software engineer with 2 years of experience
                who enjoys building projects in my free time.
              </p>
            </div>
          </div>

          <div className="about-long-description">
            <h2 className="about-long-heading">A little more about me</h2>
            <p>
              I'm a graduate from the University of Utah with a Bachelor's
              degree in Computer Science, earning a 3.7/4.0 GPA and the
              information track certificate.
            </p>
            <p>
              I enjoy not only building projects in my free time but taking the
              time to get a deeper understanding of the technologies I use.
              Because of this I spend most of my time reading and coding.
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
