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
import "./landingPage.css";

function LandingPage() {
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
              description="My previous version of this site, where I hosted website on a raspberry pi in my house.
              That website attracted 1000's of unique visitors"
              link="https://example.com/self-hosted-website"
            />
            <ProjectCard
              cardName="SacredOS OS Contribution"
              description="Contributed to the open source project SacredOS. I added my application SpeedRead
              to its app store."
              link="https://example.com/sacredos-contribution"
            />
            <ProjectCard
              cardName="Traveling Salesman Simulation"
              description="I simulated the Traveling Salesman Problem using progressively optimized approaches.
              This was a self study into code optimization."
              link="https://example.com/traveling-salesman"
            />
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

function ProjectCard({ cardName, description, link }) {
  return (
    <a className="project-card" href={link} target="_blank">
      <h3>{cardName}</h3>
      <p>{description}</p>
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
