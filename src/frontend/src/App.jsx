import { Routes, Route } from "react-router-dom";
import AboutPage from "./AboutPage";
import LandingPage from "./LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
