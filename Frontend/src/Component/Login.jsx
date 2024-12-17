import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('http://localhost:4000/api/auth/login', data);

      
      if (res.data.message === "You have been logged out from the previous device") {
        alert(res.data.message); 
      }
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); 
    } catch (err) {

      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Something went wrong during login');
      } else {
        setError('Network error. Please try again.');
      }
    }
  };


  

  return (
    <div>
      <form onSubmit={handleLogin} className="login-form">
       <center> <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        /> <br /><br /></center>
      <center> <button type="submit">Login</button>
      <p style={{ textAlign: 'center'}}>
        Don't have an account? <a href="/signup">Sign up</a>
      </p></center> 
      </form>
      {error && <p className="error-message">{error}</p>} 
     
    </div>
  );
};

export default Login;
