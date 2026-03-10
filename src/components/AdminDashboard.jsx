import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  if (role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Access Denied</h2>
        <button onClick={() => navigate('/login')}>Back to Login</button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const submitUniversity = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5005/api/universities', 
        { name, country }, 
        { headers: { 'x-auth-token': token } }
      );
      alert("University Added!");
      setName(''); setCountry(''); setShowForm(false);
    } catch (err) {
      alert("Error: " + err.response.data.msg);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Status: Logged in as Administrator</p>
      <button onClick={handleLogout} style={{ color: 'red' }}>Logout</button>
      
      <hr />
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setShowForm(!showForm)} style={{ marginRight: '10px' }}>
          {showForm ? "Close Form" : "Add University"}
        </button>
        <button style={{ marginRight: '10px' }}>View Applications</button>
      </div>


      {showForm && (
        <form onSubmit={submitUniversity} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', width: '250px', gap: '10px' }}>
          <h3>New University</h3>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
          <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>Save to Database</button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;