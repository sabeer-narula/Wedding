import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import Header from './Header';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(firestore, 'users', user.uid), {
          username,
          email,
        });
        history.push('/login');
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
  };

  return (
    <>
    <Header />
    <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold underline mb-4">Sign Up</h2>
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
                  <label htmlFor="email" className="block mb-2">Email:</label>
                  <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border rounded"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} />
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
              <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block mb-2">Confirm Password:</label>
                  <input
                      type="password"
                      id="confirmPassword"
                      className="w-full px-3 py-2 border rounded"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Sign Up
              </button>
          </form>
          <nav className="container mx-auto flex justify-between items-center">
              <Link to="/Login" className="text-xl font-bold">Already have an account? Login here</Link>
          </nav>
      </div></>
  );
};

export default SignUp;

/* TODO: implement hashing, storage in external database */