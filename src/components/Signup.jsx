import { useState } from 'react';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSignup = async (e) => {
        e.preventDefault();
        const body = {
            email,
            setUsername,
            password
        }

        console.log(body)

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, body)
            console.log("user registered", response)
            setMessage("User registered successfully! Redirecting...");
        } catch (error) {
            console.log(error)
        }
    };
        

    return ( 

        <div className="login-container">

            <h2>Create ScholarLink Account</h2>

            <form onSubmit={handleSignup}>

                    <label>Full Name</label>
                    <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={handleUsernameChange}
                    />

                    <br />
                
                    <label>Email</label>
                    <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmailChange}
                    />

                    <br />
                
                    <label>Password</label>
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    />

                    <br />
                
                <button type="submit" className="signup-btn">Sign Up</button>
                <p className="login-link" onClick={() => navigate('/login')}>
                    Already have an account? <span onClick={() => navigate('/login')}>Login</span>
                </p>
            </form>
        </div>
    );
};


export default Signup;