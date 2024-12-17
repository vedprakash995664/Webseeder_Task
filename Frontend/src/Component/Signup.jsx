import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './Common.css'; 

const Signup = () => {
  const [data, setData] = useState({ name: '', email: '', password: '', username: '' });
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      await axios.post('http://localhost:4000/api/auth/signup', data);
      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Error during signup'); 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="signup-form">
       <center> <input
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
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
        />
        <input
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        /></center>
       <center> <button type="submit">Signup</button></center>
        <p>Already Have Account <Link to='/login'>Login</Link></p>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default Signup;
