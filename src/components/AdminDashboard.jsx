import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = "http://localhost:5000";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const [universities, setUniversities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [fees, setFees] = useState('');

  const fetchUniversities = async () => {
    try {
      const res = await axios.get('http://localhost:5005/api/universities/all');
      setUniversities(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:5005/api/applications/all', {
        headers: { 'x-auth-token': token }
      });
      setApplications(res.data);
      setView('applications');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  if (role !== 'admin') {
    return (
      <div className="access-denied-container">
        <h2>Access Denied</h2>
        <button onClick={() => navigate('/login')} className="back-btn">Back to Login</button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const submitUniversity = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5005/api/universities/add',
        { name, country, fees },
        { headers: { 'x-auth-token': token } }
      );
      alert("University Added!");
      setName('');
      setCountry('');
      setFees('');
      setShowForm(false);
      fetchUniversities();
    } catch (err) {
      console.log(err)
    }
  };

  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this university?")) return;
    try {
      await axios.delete(`http://localhost:5005/api/universities/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setUniversities(universities.filter((uni) => uni._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5005/api/applications/status/${id}`, 
        { status: newStatus },
        { headers: { 'x-auth-token': token } }
      );
      
      setApplications(applications.map(app => 
        app._id === id ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-info">
          <h1>Admin Dashboard</h1>
          <p>Status: <strong>Administrator</strong></p>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <section className="admin-controls">
        <button onClick={() => setShowForm(!showForm)} className="action-button">
          {showForm ? "Close Form" : "Add University"}
        </button>

        <button
          className="action-button secondary"
          onClick={fetchApplications}
        >
          View Applications
        </button>

        <button
          className="action-button"
          onClick={() => setView('universities')}
        >
          View Universities
        </button>
      </section>

      {showForm && (
        <div className="form-container">
          <form onSubmit={submitUniversity} className="uni-form">
            <h3>New University</h3>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />

            <input
              placeholder="Fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              required
            />
            <button type="submit" className="save-button">Save to Database</button>
          </form>
        </div>
      )}

      {view === 'universities' ? (
        <section className="data-section">
          <div className="search-container">
            <h3>University Directory</h3>
            <input
              type="test"
              placeholder="Type to filter list..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input"
            />
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>University Name</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUniversities.map((uni) => (
                <tr key={uni._id}>
                  <td>{uni.name}</td>
                  <td>{uni.country}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(uni._id)}
                      className="delete-icon-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUniversities.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
              No matching universities found.
            </p>
          )}
        </section>
      ) : (
        <section className="data-section">
          <h3 className="section-title">Submitted Applications</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student Email</th>
                <th>Target University</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>{app.studentId?.email || "Guest"}</td>
                  <td>{app.universityId?.name || "Deleted University"}</td>
                  <td style={{ color: 'var(--light-teal)', fontWeight: 'bold' }}>
                    <select
                      value={app.status || 'pending'}
                      onChange={(e) => updateStatus(app._id, e.target.value)}
                      className="status-dropdown"
                    >
                      <option value="pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {applications.length === 0 && <p style={{ textAlign: 'center', color: '#888' }}>No applications found.</p>}
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;