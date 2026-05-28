import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./landingPage.css";

function LandingPage() {
  return (
    <div className="layout">
      <Header />
      <NavBar />
      <main className="main-content">
        <section id="hero" className="section hero-section">
          <h2>Hi, I&apos;m Your Name</h2>
          <p>A short intro about yourself and what you do.</p>
        </section>

        <section id="projects" className="section projects-section">
          <h2>Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>Project 1</h3>
              <p>Short description of the project.</p>
            </div>
            <div className="project-card">
              <h3>Project 2</h3>
              <p>Short description of the project.</p>
            </div>
            <div className="project-card">
              <h3>Project 3</h3>
              <p>Short description of the project.</p>
            </div>
          </div>
        </section>

        <section id="resume" className="section resume-section">
          <h2>Resume</h2>
          <p>Summary of skills, experience, and education.</p>
          <a href="#" className="resume-link">
            Download Resume
          </a>
        </section>

        <section id="contact" className="section contact-section">
          <h2>Contact</h2>
          <p>Reach out via email or connect on social media.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
