import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlanTrip() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateItinerary = () => {
    const interestList = interests.split(',').map(i => i.trim());
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    
    let plan = `🌍 Trip to ${destination}\n`;
    plan += `📅 Duration: ${days} days\n`;
    plan += `💰 Budget: ₹${budget}\n\n`;
    
    for (let i = 1; i <= days; i++) {
      plan += `Day ${i}:\n`;
      plan += `• Morning: Explore local ${interestList[0] || 'attractions'}\n`;
      plan += `• Afternoon: Visit ${interestList[1] || 'popular spots'} in ${destination}\n`;
      plan += `• Evening: Experience local ${interestList[2] || 'food and culture'}\n\n`;
    }
    
    setItinerary(plan);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/trips/save', {
        destination,
        startDate,
        endDate,
        budget: Number(budget),
        interests: interests.split(',').map(i => i.trim()),
        itinerary
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to save trip. Please login again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Plan Your Trip</h2>
      <input
        type="text"
        placeholder="Destination (e.g. Goa, Paris)"
        value={destination}
        onChange={e => setDestination(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Budget in ₹"
        value={budget}
        onChange={e => setBudget(e.target.value)}
      />
      <input
        type="text"
        placeholder="Interests (e.g. beaches, food, hiking)"
        value={interests}
        onChange={e => setInterests(e.target.value)}
      />
      <button onClick={generateItinerary}>✨ Generate Itinerary</button>
      {itinerary && (
        <textarea
          rows="10"
          value={itinerary}
          onChange={e => setItinerary(e.target.value)}
        />
      )}
      {itinerary && (
        <button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : '💾 Save Trip'}
        </button>
      )}
    </div>
  );
}

export default PlanTrip;