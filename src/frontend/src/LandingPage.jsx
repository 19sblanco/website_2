import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import pythonLogo from "./assets/pythonLogo.png";
import javascriptLogo from "./assets/javascriptLogo.jpg";
import sqlLogo from "./assets/sqlLogo.png";
import googleCloudLogo from "./assets/googleCloudLogo.png";
import dockerLogo from "./assets/dockerLogo.png";
import gitLogo from "./assets/gitLogo.png";
import reactLogo from "./assets/reactLogo.png";
import javaLogo from "./assets/javaLogo.png";
import cSharpLogo from "./assets/cSharpLogo.png";
import sacredOSLogo from "./assets/sacredOSLogo.png";
import travelingSalesmanProjectLogo from "./assets/travelingSalesmanProjectLogo.png";
import raspberryPiServerLogo from "./assets/raspberryPiWebsiteServer.jpeg";
import "./landingPage.css";

function LandingPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success");
  const apiUrl = import.meta.env.VITE_API_URL ?? "/api";

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");
    setStatusType("success");

    try {
      const response = await fetch(`${apiUrl}/api/web/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      setStatusMessage("Thanks! Your message was sent successfully.");
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact submit failed", error);
      setStatusType("error");
      setStatusMessage(
        "Something went wrong. Please try again later or email me directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <section id="hero" className="section hero-section">
          <h1 className="hero-role">Full Stack Software Engineer</h1>
          <h1 className="hero-name">Steven Blanco</h1>
          <a href="#projects" className="btn-pill-black">
            About me
          </a>
        </section>

        <section className="tech-stack-row">
          <div className="tech-icons-container">
            <div className="tech-icons">
              <span className="tech-icon-placeholder" title="SQL">
                <img
                  className="tech-icon-image"
                  src={sqlLogo}
                  alt="SQL"
                  title="SQL"
                />
              </span>
              <span className="tech-icon-placeholder" title="Python">
                <img
                  className="tech-icon-image"
                  src={pythonLogo}
                  alt="Python"
                  title="Python"
                />
              </span>
              <span className="tech-icon-placeholder" title="CSharp">
                <img
                  className="tech-icon-image"
                  src={cSharpLogo}
                  alt="CSharp"
                  title="CSharp"
                />
              </span>
              <span className="tech-icon-placeholder" title="React">
                <img
                  className="tech-icon-image"
                  src={reactLogo}
                  alt="React"
                  title="React"
                />
              </span>
              <span className="tech-icon-placeholder" title="Git">
                <img
                  className="tech-icon-image"
                  src={gitLogo}
                  alt="Git"
                  title="Git"
                />
              </span>
              <span className="tech-icon-placeholder" title="Docker">
                <img
                  className="tech-icon-image"
                  src={dockerLogo}
                  alt="Docker"
                  title="Docker"
                />
              </span>
              <span className="tech-icon-placeholder" title="Google Cloud">
                <img
                  className="tech-icon-image"
                  src={googleCloudLogo}
                  alt="Google Cloud"
                  title="Google Cloud"
                />
              </span>
              <span className="tech-icon-placeholder" title="JavaScript">
                <img
                  className="tech-icon-image"
                  src={javascriptLogo}
                  alt="Javascript"
                  title="Javascript"
                />
              </span>
              <span className="tech-icon-placeholder" title="Java">
                <img
                  className="tech-icon-image"
                  src={javaLogo}
                  alt="Java"
                  title="Java"
                />
              </span>
            </div>
            {/* Duplicate set for seamless scrolling */}
            <div className="tech-icons">
              <span className="tech-icon-placeholder" title="SQL">
                <img
                  className="tech-icon-image"
                  src={sqlLogo}
                  alt="SQL"
                  title="SQL"
                />
              </span>
              <span className="tech-icon-placeholder" title="Python">
                <img
                  className="tech-icon-image"
                  src={pythonLogo}
                  alt="Python"
                  title="Python"
                />
              </span>
              <span className="tech-icon-placeholder" title="CSharp">
                <img
                  className="tech-icon-image"
                  src={cSharpLogo}
                  alt="CSharp"
                  title="CSharp"
                />
              </span>
              <span className="tech-icon-placeholder" title="React">
                <img
                  className="tech-icon-image"
                  src={reactLogo}
                  alt="React"
                  title="React"
                />
              </span>
              <span className="tech-icon-placeholder" title="Git">
                <img
                  className="tech-icon-image"
                  src={gitLogo}
                  alt="Git"
                  title="Git"
                />
              </span>
              <span className="tech-icon-placeholder" title="Docker">
                <img
                  className="tech-icon-image"
                  src={dockerLogo}
                  alt="Docker"
                  title="Docker"
                />
              </span>
              <span className="tech-icon-placeholder" title="Google Cloud">
                <img
                  className="tech-icon-image"
                  src={googleCloudLogo}
                  alt="Google Cloud"
                  title="Google Cloud"
                />
              </span>
              <span className="tech-icon-placeholder" title="JavaScript">
                <img
                  className="tech-icon-image"
                  src={javascriptLogo}
                  alt="Javascript"
                  title="Javascript"
                />
              </span>
              <span className="tech-icon-placeholder" title="Java">
                <img
                  className="tech-icon-image"
                  src={javaLogo}
                  alt="Java"
                  title="Java"
                />
              </span>
            </div>
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <h2>Work Experience</h2>
          <div className="experience-list">
            <ExperienceItem
              title="Software Engineer"
              company="Digital Family Office"
              period="January 2026 - April 2026"
              description="Contributed to the development of a .NET and React application hosted on google cloud. I worked on the frontend, backend, and CI/CD pipeline, where I contributed to the development, testing, and monitoring of the system."
            />
            <ExperienceItem
              title="Junior Software Engineer/Developer"
              company="Digital Creations"
              period="July 2025 - January 2026"
              description="Helped maintain and build new features in a web based electronic medical records system written in HTML, CSS, Javascript, and PHP. I implimented features based on stake holders requests, presented system findings to the dev team, and pushed for new features for a better overall product."
            />
            <ExperienceItem
              title="Software Engineer Contractor"
              company="Oak Tree Technologies"
              period="September 2024 - January 2025"
              description="Collaborated in cross functional teams and worked directly with customers to build custom solutions, including a program for sales affiliate. I also authored documentation for internal use."
            />
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <h2>Projects</h2>
          <div className="projects-grid">
            <ProjectCard
              cardName="Self Hosted Website"
              description="My previous version of this site, I hosted that website on a raspberry pi on my home network.
              That website attracted 1000's of unique visitors"
              link="https://steven-blanco.com/"
              logo={raspberryPiServerLogo}
            />
            <ProjectCard
              cardName="SacredOS OS Contribution"
              description="Contributed to the open source project SacredOS. I added my application SpeedRead
              to its app store."
              link="https://sacred.neocities.org/"
              logo={sacredOSLogo}
            />
            <ProjectCard
              cardName="Traveling Salesman Simulation"
              description="I simulated the Traveling Salesman Problem using progressively optimized approaches.
              This was a self study into code optimization."
              link="https://github.com/19sblanco/tsp_c"
              logo={travelingSalesmanProjectLogo}
            />
          </div>
        </section>

        <section id="resume" className="section resume-section">
          <h2>Resume</h2>
          <p>Summary of skills, experience, and education.</p>
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="resume-link"
          >
            Download Resume
          </a>
        </section>

        <section id="contact" className="section contact-section">
          <h2>Contact</h2>
          <p>
            If you're interest in my work or would like to work with me on
            anything, please submit it down below and I can get in contact with
            you.
          </p>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label className="contact-field">
              <span>Name</span>
              <input
                className="contact-input"
                type="text"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="Your name"
                required
              />
            </label>

            <label className="contact-field">
              <span>Email</span>
              <input
                className="contact-input"
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="contact-field">
              <span>Message</span>
              <textarea
                className="contact-textarea"
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                placeholder="What would you like to contact me about?"
                required
              />
            </label>

            <button
              type="submit"
              className="resume-link contact-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </button>
          </form>

          {statusMessage && (
            <div
              className={`contact-status ${
                statusType === "error"
                  ? "contact-status-error"
                  : "contact-status-success"
              }`}
            >
              {statusMessage}
            </div>
          )}

          <div className="contact-links">
            <a className="contact-link" href="mailto:steven.blanc521@gmail.com">
              steven.blanc521@gmail.com
            </a>
            <a
              className="contact-link"
              href="https://www.linkedin.com/in/steven-blanco-b69553199/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn: Steven Blanco
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ProjectCard({ cardName, description, link, logo }) {
  return (
    <a className="project-card" href={link} target="_blank" rel="noreferrer">
      {logo && (
        <div className="project-card-image">
          <img className="project-card-logo" src={logo} alt={cardName} />
        </div>
      )}
      <div className="project-card-body">
        <h3>{cardName}</h3>
        <p>{description}</p>
      </div>
    </a>
  );
}

function ExperienceItem({ title, company, period, description }) {
  return (
    <div className="experience-item">
      <div className="experience-header">
        <h3 className="experience-title">{title}</h3>
        <span className="experience-period">{period}</span>
      </div>
      <div className="experience-company">{company}</div>
      <p className="experience-description">{description}</p>
    </div>
  );
}

export default LandingPage;
