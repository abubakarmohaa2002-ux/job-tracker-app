import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import JobDetailPage from "./pages/JobDetailPage";

const App = () => {
  return (
    <div className="relative h-full w-full">

      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,transparent_60%,#00FF9D40_100%)]" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/job/:id" element={<JobDetailPage />} />
      </Routes>

    </div>
  );
};

export default App;
