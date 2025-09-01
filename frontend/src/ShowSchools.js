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
        // Try to fetch from the real backend
        const response = await axios.get('https://schoolmanagement-production-5325.up.railway.app/api/schools');
        setSchools(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching schools:', err);
        // If backend fails, use mock data
        setError('Could not connect to server. Showing sample data.');
        setSchools([
          {
            id: 1,
            name: "Delhi Public School",
            address: "123 Education Street, Model Town",
            city: "New Delhi",
            image: "school1.jpg"
          },
          {
            id: 2,
            name: "Mumbai International School",
            address: "456 Knowledge Road, Bandra West",
            city: "Mumbai",
            image: "school2.jpg"
          },
          {
            id: 3,
            name: "Bangalore Tech Academy",
            address: "789 Innovation Avenue, Electronic City",
            city: "Bangalore",
            image: "school3.jpg"
          }
        ]);
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) return <div className="loading">Loading schools...</div>;

  return (
    <div className="show-schools-container">
      <h1>Schools Directory</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="schools-grid">
        {schools.length === 0 ? (
          <p>No schools found. Add some schools to get started!</p>
        ) : (
          schools.map((school) => (
            <div key={school.id} className="school-card">
              <div className="school-image">
                <img 
                  src={`https://via.placeholder.com/300x200/4CAF50/white?text=${encodeURIComponent(school.name)}`} 
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