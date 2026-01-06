import { Routes, Route, Navigate } from "react-router-dom";
import Shell from "./components/shell";

import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/about";
import Contact from "./pages/Contact";
import Stack from "./pages/stack";


export default function App() {
  return (
    <Routes>
      {/* Shell wraps all pages and provides <Outlet /> */}
      <Route path="/" element={<Shell />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="stack" element={<Stack />} />


        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
