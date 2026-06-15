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
                I'm a full stack web software engineer with 2 years of
                experience and a passion for building projects with the end user
                in mind. My interests include computer security, low level
                programming, and system design
              </p>
            </div>
          </div>

          <div className="about-long-description">
            <h2 className="about-long-heading">A little more about me</h2>
            <p>
              My journey began at Utah State University where I transfered and
              graduated from the University of Utah. I really enjoyed my
              education there and in particular my software practice classes,
              computer security class, AI classes, and learning about low level
              programming.
            </p>
            <p>
              In my free time, I've contributed to open source projects, built
              side projects, and created fun personal tools. In the age of AI,
              I'm looking to build my skills in the things that AI can't do.
            </p>
            <p>
              I enjoy learning new technologies and building projects in my free
              time. I find that the best way to learn start with theory then,
              build something with it, then write about my experiences and
              results.
            </p>
          </div>

          <Link to="/" className="btn-pill-black">
            ← Back to home
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
