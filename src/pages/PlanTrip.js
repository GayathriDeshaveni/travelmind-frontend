import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const INTERESTS = [
  '🏖️ Beaches', '🍜 Food & Cuisine', '🌙 Nightlife', '🧗 Adventure',
  '🏛️ Culture & Arts', '🛍️ Shopping', '🌿 Nature & Hiking', '🏛️ History',
  '📸 Photography', '🧘 Wellness & Spa', '🎵 Music & Festivals', '⛷️ Winter Sports',
  '🐘 Wildlife & Safari', '🍷 Wine & Dining', '🏄 Water Sports', '🎨 Local Crafts',
  '🚴 Cycling', '🧳 Backpacking', '👨‍👩‍👧 Family Friendly', '💑 Romantic Getaway'
];

function PlanTrip() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [travelers, setTravelers] = useState('1');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const getDays = () => {
    if (!startDate || !endDate) return 0;
    return Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const generateItinerary = async () => {
    if (!destination || !startDate || !endDate || !budget) {
      alert('Please fill in all fields!');
      return;
    }
    if (getDays() <= 0) {
      alert('End date must be after start date!');
      return;
    }
    setLoading(true);
    setItinerary('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://travelmind-api.onrender.com/api/ai/generate', {
        destination,
        startDate,
        endDate,
        budget,
        travelers,
        interests: selectedInterests
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItinerary(response.data.itinerary);
    } catch (err) {
      setItinerary('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      await axios.post('https://travelmind-api.onrender.com/api/trips/save', {
        destination,
        startDate,
        endDate,
        budget: Number(budget),
        interests: selectedInterests,
        itinerary
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to save trip. Please login again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="plan-page">
      <h2>Plan your <span>perfect trip</span></h2>
      <p className="subtitle">Tell us where you want to go — AI will handle the rest</p>

      <div className="plan-form">
        <div className="form-field full">
          <label>📍 Destination</label>
          <input
            type="text"
            placeholder="Where do you want to go? (e.g. Goa, Paris, Tokyo)"
            value={destination}
            onChange={e => setDestination(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>📅 Start date</label>
          <input
            type="date"
            value={startDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={e => setStartDate(e.target.value)}
          />
          {startDate && <span className="date-display">{formatDate(startDate)}</span>}
        </div>

        <div className="form-field">
          <label>📅 End date</label>
          <input
            type="date"
            value={endDate}
            min={startDate || new Date().toISOString().split('T')[0]}
            onChange={e => setEndDate(e.target.value)}
          />
          {endDate && <span className="date-display">{formatDate(endDate)}</span>}
        </div>

        {startDate && endDate && getDays() > 0 && (
          <div className="form-field full">
            <div className="duration-badge">
              🗓️ {getDays()} day{getDays() > 1 ? 's' : ''} trip
            </div>
          </div>
        )}

        <div className="form-field">
          <label>💰 Budget (₹)</label>
          <input
            type="number"
            placeholder="Total budget in rupees"
            value={budget}
            onChange={e => setBudget(e.target.value)}
          />
          {budget && (
            <span className="date-display">
              ≈ ₹{Math.round(Number(budget) / (getDays() || 1)).toLocaleString()} per day
            </span>
          )}
        </div>

        <div className="form-field">
          <label>👥 Travelers</label>
          <select value={travelers} onChange={e => setTravelers(e.target.value)}>
            <option value="1">1 person — Solo</option>
            <option value="2">2 people — Couple</option>
            <option value="3">3 people — Small group</option>
            <option value="4">4 people — Family</option>
            <option value="5">5+ people — Large group</option>
          </select>
        </div>

        <div className="form-field full">
          <label>🎯 Interests — select all that apply</label>
          <div className="interests-grid">
            {INTERESTS.map(interest => (
              <span
                key={interest}
                className={`interest-tag ${selectedInterests.includes(interest) ? 'active' : ''}`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </span>
            ))}
          </div>
          {selectedInterests.length > 0 && (
            <p className="selected-count">{selectedInterests.length} interest{selectedInterests.length > 1 ? 's' : ''} selected</p>
          )}
        </div>

        <button
          className="generate-btn"
          onClick={generateItinerary}
          disabled={loading}
        >
          {loading ? '✦ Generating your itinerary...' : '✦ Generate my itinerary'}
        </button>
      </div>

      {itinerary && (
        <div className="results-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="s-label">Destination</div>
              <div className="s-value">{destination}</div>
            </div>
            <div className="stat-card">
              <div className="s-label">Duration</div>
              <div className="s-value">{getDays()} days</div>
              <div className="s-sub">{formatDate(startDate)} → {formatDate(endDate)}</div>
            </div>
            <div className="stat-card">
              <div className="s-label">Total budget</div>
              <div className="s-value">₹{Number(budget).toLocaleString()}</div>
              <div className="s-sub">{travelers} traveler(s)</div>
            </div>
          </div>

          <div className="itinerary-output">{itinerary}</div>

          <button className="save-btn" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : '💾 Save this trip'}
          </button>
        </div>
      )}
    </div>
  );
}

export default PlanTrip;