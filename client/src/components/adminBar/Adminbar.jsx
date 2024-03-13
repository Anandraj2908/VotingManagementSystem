import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {logout as authLogout} from '../../store/authSlice';

const Adminbar = () => {
  const dispatch =  useDispatch();

  const handelLogout=() => {
    dispatch(authLogout())
  }
  return (
    <div className="h-16 bg-gray-800 flex items-center justify-between px-4">
      <div className="text-white text-3xl font-bold">Admin Panel</div>
      <div className="flex items-center">
      <div className="bg-gray-700 p-4 mt-12 rounded-xl flex justify-between items-center">
      <div className="text-white font-bold">
        <Link to="/admin/addelection" className="mr-4 hover:text-gray-300">Add Election</Link>
        <Link to="/admin/upcomingelections" className="mr-4 hover:text-gray-300">Upcoming Elections</Link>
        <Link to="/admin/addcandidate" className="mr-4 hover:text-gray-300">Add Candidate</Link>
        <Link to="/admin/candidates" className="mr-4 hover:text-gray-300">Candidates</Link>
      </div>
      <Link onClick={handelLogout} to="/login" className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg  hover:bg-red-600 focus:outline-none focus:bg-red-600">Logout</Link>
    </div>
      </div>
    </div>
  );
};

export default Adminbar;
