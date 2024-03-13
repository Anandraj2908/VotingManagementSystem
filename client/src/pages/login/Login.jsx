import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {login as authLogin} from '../../store/authSlice'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for storing error message
  const navigate = useNavigate();
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    const data = {
      username: username,
      password: password
    };
    axios.post('http://localhost:8000/api/v1/users/login', data)
      .then(res => {
        console.log('User Logged in', res.data);
        dispatch(authLogin(res.data));
        if(res.data.data[0].username=="admin"){
          
          navigate('/admin/upcomingelections')
        }
        else
        navigate('/vote');
      })
      .catch(err => {
        console.log('Error', err.response.data.data);
        setError(err.response.data.data); // Set error state with the error message
      });
  };

  const handlePopupClose = () => {
    setError(null); // Clear error message when closing the pop-up
  };

  return (
    <div className="flex justify-center items-center">
      <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 m-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-center text-gray-800 font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>

      
      {error && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 ">
              <svg onClick={handlePopupClose} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path fillRule="evenodd" d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.359 5.652a.5.5 0 00-.708.708L9.293 10l-3.64 3.643a.5.5 0 10.708.707L10 10.707l3.643 3.641a.5.5 0 00.707-.707L10.707 10l3.641-3.648a.5.5 0 000-.707z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
