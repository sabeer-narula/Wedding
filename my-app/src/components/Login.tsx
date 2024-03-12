import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      history.push('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold underline mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">Username:</label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </form>
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/Signup" className="text-xl font-bold">Don't have an account? Sign up here</Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
/* TODO: implement retrieval from database, authentication API, stored user data if logged in (selected vendors), account profile page */