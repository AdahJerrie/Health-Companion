import { Outlet, Link, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-3 py-2 rounded transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">AI Health Assistant</h1>
        <div className="space-x-2">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          <Link to="/consultation" className={linkClass("/consultation")}>
            Consultation
          </Link>
          <Link to="/results" className={linkClass("/results")}>
            Results
          </Link>
          <Link to="/history" className={linkClass("/history")}>
            History
          </Link>
          <Link to="/profile" className={linkClass("/profile")}>
            Profile
          </Link>
          <Link to="/about" className={linkClass("/about")}>
            About
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow p-4 text-center text-gray-500">
        © {new Date().getFullYear()} AI Health Assistant. All rights reserved.
      </footer>
    </div>
  );
}
