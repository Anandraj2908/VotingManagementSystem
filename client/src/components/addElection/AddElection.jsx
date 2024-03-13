import React, { useState } from 'react';
import UpcommingE from '../upcommingElections/upcommingE.jsx';
import axios from 'axios';

const AddElection = () => {
  // State to manage form fields
  const [electionData, setElectionData] = useState({
    topic: ''
  });

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/api/v1/admin/addelection',electionData)
      .then(res => {
        console.log('Election added', res);
        window.location.reload();
      })
      .catch(err => {
        console.log('Error', err);
        
      });
    // Reset form fields
    setElectionData({
      topic: ''
    });
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setElectionData({
      ...electionData,
      [name]: value
    });
  };

  return (
    <div className="max-w-screen-xl  m-8 grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="col-span-1 bg-gray-200 shadow-md rounded-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Add Election</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="topic" className="block text-gray-700">Election Topic</label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={electionData.topic}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
      <div className="col-span-4">
        <UpcommingE />
      </div>
    </div>
  );
};

export default AddElection;
