import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import {logout as authLogout} from '../../store/authSlice';
import { useSelector } from 'react-redux'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  const dispatch =  useDispatch();
  const handleLogin = () => {
    // Logic for handling login
    navigate('/login')
  };

  const handleLogout = () => {
    // Logic for handling logout
    axios.post('http://localhost:8000/api/v1/users/logout')
      .then(res => {
        console.log('User Logged out', res.data);
        dispatch(authLogout())
        navigate('/');
      })
      .catch(err => {
        console.log('Error', err); // Set error state with the error message
      });
    
  };

  return (
    <header className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Voting Management System</h1>
        <nav>
          <ul className="flex space-x-4">
            {authStatus ? (
              <>
                
                <li>
                  <button className="bg-white text-blue-500 border border-blue-500 rounded-md px-4 py-2 shadow-sm hover:bg-blue-500 hover:text-white" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                    <button className="bg-white text-blue-500 border border-blue-500 rounded-md px-4 py-2 shadow-sm hover:bg-blue-500 hover:text-white" onClick={handleLogin}>Login</button>
                </li>
                <li>
                  <Link to="/signup">
                    <button className="bg-white text-blue-500 border border-blue-500 rounded-md px-4 py-2 shadow-sm hover:bg-blue-500 hover:text-white" onClick={handleLogin}>Sign Up</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
