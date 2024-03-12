import React, { useState } from 'react';
import { auth } from '../firebase';
import { updateProfile, updatePassword } from 'firebase/auth';
import Header from './Header';

const Profile = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await updateProfile(user, { displayName, photoURL });
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && password === confirmPassword) {
      await updatePassword(user, password);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Profile</h2>
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label htmlFor="displayName" className="block mb-2">
              Name:
            </label>
            <input
              type="text"
              id="displayName"
              className="w-full px-3 py-2 border rounded"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photoURL" className="block mb-2">
              Profile Picture URL:
            </label>
            <input
              type="text"
              id="photoURL"
              className="w-full px-3 py-2 border rounded"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Profile
          </button>
        </form>

        <form onSubmit={handleUpdatePassword} className="mt-8">
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              New Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2">
              Confirm New Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;