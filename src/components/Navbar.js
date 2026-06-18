import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span>✦</span> TravelMind
      </Link>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/plan">Plan Trip</Link>
            <button onClick={handleLogout}>Sign out</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;