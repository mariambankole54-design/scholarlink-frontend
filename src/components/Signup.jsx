import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSignup = async (e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:5005/api/auth/signup', {
                name,
                email,
                password
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            alert("Account created! Please Login.");
            navigate('/login');
        } catch (err) {
            alert("Signup Error: " + (err.response?.data?.msg || "Something went wrong"));
        } 
    };
    return (
        <div className="login-container">
            <h2>Create ScholarLink Account</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </div>
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button type="submit" className="login-btn">Sign Up</button>
            </form>
        </div>
    );
};


export default Signup;