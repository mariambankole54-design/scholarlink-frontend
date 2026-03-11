import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/api/auth/login', {
        email,
        password
      });


      const { token, user } = response.data;

      if (!token) {
        return;
      }

      const userRole = user.role;

      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);

      if (userRole === 'admin') {
        navigate('/AdminDashboard');
      } else {
        navigate('/UserDashboard');
      }

    } catch (err) {
      console.log(err);
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