import { useState } from 'react'
import axios from'axios';
import { useNavigate } from'react-router-dom'


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', token);
      localStorage.setItem('role', role); 
      alert("Login Successful!");

    // I am attempting to use if else here to reroute for admin because I want to keep the login page the same for all parties. I will find another solution if it doesn't work
    if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/'); 
      }

    } catch (err) {
      alert("Error: " + err.response.data.msg);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to ScholarLink</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </div>
        <div className="form-group">
          <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
