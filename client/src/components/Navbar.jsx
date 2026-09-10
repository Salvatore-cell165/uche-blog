import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="border-b border-hairline">
      <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl text-bone tracking-tight">
          Ledger
        </Link>

        <nav className="font-sans text-sm flex items-center gap-5">
          {user ? (
            <>
              <span className="text-bone/70">Signed in as {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-gold hover:text-bone transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-bone/70 hover:text-bone transition-colors">
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-ink bg-gold px-3 py-1.5 rounded-sm hover:bg-bone transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
