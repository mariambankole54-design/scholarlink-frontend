import { useEffect, useState } from 'react';
import axios from 'axios';

const MyApplications = () => {
  const [apps, setApps] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchApps = async () => {
      const res = await axios.get(`http://localhost:5005/api/applications/student/${user.id}`);
      setApps(res.data);
    };
    fetchApps();
  }, [user.id]);

  return (
    <div className="apps-container">
      <h2>My University Applications</h2>
      {apps.length === 0 ? <p>No applications found.</p> : (
        <table>
          <thead>
            <tr>
              <th>University</th>
              <th>Status</th>
              <th>Date Applied</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(app => (
              <tr key={app._id}>
                <td>{app.universityId.name}</td>
                <td><span className={`status ${app.status}`}>{app.status}</span></td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyApplications;