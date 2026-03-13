import React,{ useEffect, useState } from 'react';
import axios from 'axios';

const MyApplications = () => {
    const [apps, setApps] = useState([]);
    const [message, setMessage] = useState({ text: "", type: "" });

    // to get the user data
    const userData = localStorage.getItem('student');
    const user = userData ? JSON.parse(userData) : null;
    

        const fetchApps = async () => {
    const studentId = user?._id || user?.id;

    try {

        const res = await axios.get(`http://localhost:5005/api/applications/${user}`);
        
        setApps(res.data);
    } catch (err) {
        console.error("Error fetching applications:", err);
    }
};


        const handleDelete = async (appId) => {
        try {
            await axios.delete(`http://localhost:5005/api/applications/delete/${appId}`)
            setMessage({ text: "Application withdrawn successfully.", type: "success" });

            console.log("delete");
            
            fetchApps(); 
        } catch (err) {
            setMessage({ text: "Could not delete application.", type: "error" });
        }
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    };
    useEffect(() => {
        fetchApps();
    }, []);

    console.log("3")

    return (
        <div className="apps-container" style={{ padding: '20px' }}>
            <h2>My University Applications</h2>
            {apps.length === 0 ? <p>No applications found.</p> : (
                <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#eee' }}>
                            <th>University</th>
                            <th>Status</th>
                            <th>Date Applied</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apps.map(app => (
                            <tr key={app._id}>
                                {/*changed from app._id to application.id to see if it will work*/}

                                <td>{app.universityId?.name || "N/A"}</td>
                                <td>{app.status}</td>
                                <td>{app.appliedAt? new Date(app.appliedAt).toLocaleDateString() : "N/A"}</td>
                                <td>
                                    {app.status === 'pending' && (
                                        <button onClick={() => handleDelete(app._id)} className="withdraw-btn">
                                            Withdraw
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyApplications;