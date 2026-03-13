import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import axios from 'axios';


const UserDashboard = () => {
  const [universities, setUniversities] = useState([]);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:5005/api/universities/all')
      .then(res => setUniversities(res.data))
      .catch(err => console.log(err));
  }, []);


  const handleApply = async (uniId) => {
    const token = localStorage.getItem('token');
    //It was breaking because I did not add the user, I only added the token. phew!
    const user = JSON.parse(localStorage.getItem('student'));

    /*if (!user) {
      console.log("Not student data");
    } */

    console.log(token);
    // adding this to see if studentId will be found now 
    try {
      const applicationData = {
        universityId: uniId,
        studentId: student.id
      };

      await axios.post(
        'http://localhost:5005/api/applications/apply', applicationData,

        /*writing it out in case it is the problem
        { universityId: uniId },
        { studentId: user.id }, */
        { headers: { 'x-auth-token': token } }
      );

      console.log("Application created correctly");

    } catch (err) {
      console.log(err)
    }
  };

  console.log(universities)

  const filteredUniversities = universities.filter((uni) => {
    /* COME BACK!
        const matchesSearch =
          uni.programTitle?.toLowerCase().includes(search.toLowerCase());
    
        const matchesLevel =
          level === '' || uni.level === level;
    
        const matchesSpecialisation =
          specialisation === '' || uni.specialisation === specialisation; */

    const matchesCountry =
      country === '' || uni.country === country;
    /*COME BACK!
        return matchesSearch && matchesLevel && matchesSpecialisation && matchesCountry; */

    return matchesCountry;
  });

  console.log(filteredUniversities) 

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h2>Available Universities</h2>
        <p>
          Browse international universities and submit your application directly through ScholarLink.
        </p>
      </div>
      <div className="dashboard-layout">
        {/*I am trying to make both containers side by side and not vertical*/}
        <div className="filter-container">

         {/* <h3>Filter</h3>

          <div className="filter-group">

            <select onChange={(e) => setLevel(e.target.value)}>
              <option value="">Select Level of Interest</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PhD">PhD</option>
            </select>

          </div>

           <div className="filter-group">

            <select onChange={(e) => setSpecialisation(e.target.value)}>
              <option value="">Select Area of Specialisation</option>
              <option value="Accounting">Accounting</option>
              <option value="Architecture">Architecture</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Medicine">Medicine</option>
            </select>

          </div> 

          <div className="filter-group">

            <select onChange={(e) => setCountry(e.target.value)}>
              <option value="">All Countries</option>
              <option value="Mauritius">Mauritius</option>
              <option value="UK">United Kingdom</option>
              <option value="USA">Bulgaria</option>
            </select>

          </div> */}
        </div>

      </div> 


      <Link to="/profile" className="profile-nav-btn">
        My Profile
      </Link>

      <button onClick={() => navigate('/applications')} className="applications-button">
        My Applications
      </button>


      <div className="university-grid">
        {filteredUniversities.map((uni) => (
          <div key={uni._id} className="uni-card">

            <div className="uni-content">
              <h3>{uni.name}</h3>

              <p className="location">
                📍 {uni.country}
              </p>
            </div>

            <button
              className="apply-btn"
              onClick={() => handleApply(uni._id)}
            >
              Apply to University
            </button>


          </div>
        ))}
      </div>

    </div>
  );
};

export default UserDashboard;