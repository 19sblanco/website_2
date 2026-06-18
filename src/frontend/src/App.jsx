import { Routes, Route } from "react-router-dom";
import AboutPage from "./AboutPage";
import LandingPage from "./LandingPage";
import PrivacyPage from "./PrivacyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  );
}

export default App;
