import axios from 'axios';

export const setAuthToken = (token: string) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

export const getAuthToken = () => {
    return localStorage.getItem('token');
  };