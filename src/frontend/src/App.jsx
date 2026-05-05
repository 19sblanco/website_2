import { Routes, Route } from "react-router-dom";
import TestPage from "./test_page";

function App() {
  return (
    <Routes>
      <Route path="test_page" element={<TestPage />} />
    </Routes>
  );
}

export default App;
