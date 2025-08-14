import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import City from "./pages/City";
import { useEffect, useState } from "react";

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    setShowBack(location.pathname !== "/");
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-200">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md shadow-md">
        <h1
          className="text-2xl font-bold text-blue-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Weather App
        </h1>
        {showBack && (
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            ← Back to Home
          </button>
        )}
      </header>

      {/* Page Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city" element={<City />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
