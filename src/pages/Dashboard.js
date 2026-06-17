import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
useEffect(() => {
    fetchTrips();
    // eslint-disable-next-line
  }, []);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/trips/mytrips', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrips(res.data);
    } catch (err) {
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrips(trips.filter(trip => trip._id !== id));
    } catch (err) {
      alert('Failed to delete trip');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  if (loading) return <div className="form-container"><p>Loading...</p></div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {username}! ✈️</h2>
        <div>
          <Link to="/plan"><button>+ Plan New Trip</button></Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {trips.length === 0 ? (
        <div className="no-trips">
          <p>No trips yet!</p>
          <Link to="/plan"><button>Plan your first trip</button></Link>
        </div>
      ) : (
        <div className="trips-grid">
          {trips.map(trip => (
            <div key={trip._id} className="trip-card">
              <h3>📍 {trip.destination}</h3>
              <p>📅 {trip.startDate} → {trip.endDate}</p>
              <p>💰 Budget: ₹{trip.budget}</p>
              <p>🎯 Interests: {trip.interests.join(', ')}</p>
              <pre className="itinerary">{trip.itinerary}</pre>
              <button
                onClick={() => deleteTrip(trip._id)}
                className="delete-btn">
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;