import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

const Layout = ({ children }) => {
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
        {/* App Title */}
        <h1
          className="text-2xl font-bold text-blue-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Weather App
        </h1>

        {/* Social Icons & Back Button */}
        <div className="flex items-center gap-4">
          <a
            href="https://web.facebook.com/thilina.thushara.169/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://www.instagram.com/thi_li_na._/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-700 transition"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://github.com/IT22003850"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-black transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/thilina-thushara"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 transition"
          >
            <FaLinkedinIn size={20} />
          </a>

          {showBack && (
            <button
              onClick={() => navigate("/")}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              ← Back to Home
            </button>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
