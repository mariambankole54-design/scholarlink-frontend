import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './components/Login'; 
import Signup from './components/Signup';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Applications from './components/MyApplications';
import StudentProfile from './components/StudentProfile';


function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="logo">S͇C͇H͇O͇L͇A͇R͇L͇I͇N͇K</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/Signup">Sign up</Link>
          {/* <Link to="/profile">Profile</Link> */}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Admindashboard" element={<AdminDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/Applications" element={<Applications />} />
          <Route path="/Profile" element={<StudentProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;