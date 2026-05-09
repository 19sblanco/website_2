import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import TestPage from "./TestPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="test_page" element={<TestPage />} />
    </Routes>
  );
}

export default App;
