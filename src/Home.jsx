import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to ScholarLink</h1>
      </div>

      <div className="intro-text">
            <p>
            At ScholarLink, we believe every student deserves access to quality education without barriers. 
            We connect African students with international universities at no cost, opening doors to 
            global opportunities and bright futures.
            </p>
      </div>

      <div className="offer">
            What We Offer
      </div>
      <div className="offerlist">

            <ul>
            <li>Free University Connections: Get connected to top universities worldwide without paying any service fees.</li>
            <li>Personalised Guidance: Receive support tailored to your academic and career goals.</li>
            <li>Global Opportunities: Explore programs across Europe, Asia, Africa, and the Americas.</li>
            </ul>
      </div>

      <div className="journey">
          <p>
            Your Journey Starts Here
            ScholarLink is here to empower you. We'd like to help you take the first step toward reaching your academic dreams.
          </p>
      </div>

       <div className="contact">
        <p>  
            Contact us today to begin your journey to international education!
          </p>
      </div>

        <div className="btn-submit">
            <button onClick={() => navigate('/Signup')}>
          APPLY NOW!
        </button>

      </div>
      </div>
    
  );
};

export default Home;