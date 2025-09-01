import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowSchools.css';

function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schools');
        setSchools(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching schools:', err);
        setError('Failed to load schools. Please try again later.');
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) return <div className="loading">Loading schools...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="show-schools-container">
      <h1>Schools Directory</h1>
      <div className="schools-grid">
        {schools.length === 0 ? (
          <p>No schools found. Add some schools to get started!</p>
        ) : (
          schools.map((school) => (
            <div key={school.id} className="school-card">
              <div className="school-image">
                <img 
                  src={`http://localhost:5000/schoolImages/${school.image}`} 
                  alt={school.name} 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x150?text=Image+Not+Found';
                  }}
                />
              </div>
              <div className="school-info">
                <h3>{school.name}</h3>
                <p>{school.address}</p>
                <p>{school.city}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShowSchools;