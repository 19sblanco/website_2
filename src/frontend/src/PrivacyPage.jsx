import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./privacyPage.css";

function PrivacyPage() {
  return (
    <div className="layout">
      <Header />
      <main className="main-content privacy-page">
        <section className="privacy-page-section">
          <p className="privacy-label">Privacy</p>
          <h1 className="privacy-title">Privacy notice</h1>
          <p className="privacy-updated">Last updated: June 18, 2026</p>

          <div className="privacy-body">
            <p>
              This site is operated by Steven Blanco. This notice explains what
              information is collected when you use the site and how it is used.
            </p>

            <h2>Contact form</h2>
            <p>
              When you submit the contact form, I store your name, email
              address, and message. I will also send you an automatic
              confirmation email and a notification to my inbox using my email
              provider.
            </p>

            <h2>Usage and analytics</h2>
            <p>
              When you browse the site, I collect basic usage data to understand
              how visitors use the portfolio. This may include:
            </p>
            <ul>
              <li>
                A random session identifier stored in your browser for the
                current tab
              </li>
              <li>Actions such as project link clicks and resume downloads</li>
            </ul>
            <p>
              This data is not used for advertising and is not sold to third
              parties.
            </p>

            <h2>Linking contact submissions to visits</h2>
            <p>
              If you submit the contact form during a visit, your submission may
              be associated with that visit&apos;s analytics record (for
              example, which projects you viewed before contacting me). This
              helps me understand context around inquiries.
            </p>

            <h2>Why this data is collected</h2>
            <ul>
              <li>To understand which content visitors find useful</li>
            </ul>

            <h2>Who can access this data</h2>
            <p>Access is limited to:</p>
            <ul>
              <li>Me (Steven Blanco)</li>
              <li>
                Service providers that host or operate the site (for example,
                Google Cloud for hosting and logging)
              </li>
              <li>
                My email provider when messages are sent or delivery is
                attempted
              </li>
            </ul>

            <h2>Your choices</h2>
            <p>
              You can choose not to submit the contact form and just send an
              email instead. If you have questions about data I hold about you,
              or would like to request deletion, email me using the address
              shown in the site header.
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

export default PrivacyPage;
