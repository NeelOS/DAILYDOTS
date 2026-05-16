import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">📔</span>
          <h1 className="text-xl font-bold text-gray-900">DailyDots</h1>
        </Link>

        <div className="flex gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              isActive('/')
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Home
          </Link>
          <Link
            to="/journals"
            className={`text-sm font-medium transition-colors ${
              isActive('/journals')
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Journals
          </Link>
          <Link
            to="/add"
            className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
              isActive('/add')
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            New Entry
          </Link>
        </div>
      </div>
    </nav>
  );
}
