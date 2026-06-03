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
          <h1>Hi, I'm Steven Blanco</h1>
          <p>
            I have 2 years of experience working as a Full Stack Developer where
            I gained experience in working with the Backend, Frontend, CI/CD
            pipeline, Google cloud, and working with users. In my free time, I
            enjoy completing projects and learning theory. I made this website
            to showcase my programming, both professionally and personally.
          </p>
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

export default LandingPage;
