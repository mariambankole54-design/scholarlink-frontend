import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserDashboard = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5005/api/universities/all')
      .then(res => setUniversities(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleApply = async (uniId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5005/api/applications', 
        { universityId: uniId }, 
        { headers: { 'x-auth-token': token } }
      );
      alert("Application Submitted Successfully!");
    } catch (err) {
      alert("You already applied or there was an error.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Scholarships for Students</h2>
        <p>Explore international opportunities and take the next step in your education.</p>
      </div>
      
      <div className="university-grid">
        {universities.map(uni => (
          <div key={uni._id} className="uni-card">
            <div className="uni-content">
              <h3>{uni.name}</h3>
              <p className="location">
                <span>📍</span> {uni.country}
              </p>
            </div>
            <button className="apply-btn" onClick={() => handleApply(uni._id)}>
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;