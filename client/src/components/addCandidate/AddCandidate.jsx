import React, { useState,useEffect } from 'react';
import CandidateDetails from '../candidateDetails/CandidateDetails.jsx';
import axios from 'axios';

const AddCandidate = () => {
  const [upcomingElections, setUpcomingElections] = useState([]);
  useEffect(() =>{

    axios.get('http://localhost:8000/api/v1/admin/getelections')
      .then(res => {
        
        if(res.data.data.length>0){
          setUpcomingElections(res.data.data);
        }
      })
      .catch(err => {
        console.log('Error', err);
        
      });
  },[])
  // State to manage form fields

  const [candidateData, setCandidateData] = useState({
    name: '',
    election_id: ''
  });

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to submit candidate data
    axios.post('http://localhost:8000/api/v1/admin/addcandidate',candidateData)
      .then(res => {
        console.log('Candidate added', res);
        window.location.reload();
      })
      .catch(err => {
        console.log('Error', err);
        
      });
    
    console.log('Submitted Candidate Data:', candidateData);
    // Reset form fields
    setCandidateData({
      name: '',
      election_id: ''
    });
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCandidateData({
      ...candidateData,
      [name]: value
    });
  };

  return (
    <div className="max-w-screen-xl m-8 grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="col-span-1 bg-gray-200 shadow-md rounded-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Add Candidate</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Candidate Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={candidateData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="election" className="block text-gray-700">Choose Election</label>
            <select
              id="election"
              name="election_id"
              value={candidateData.election_id}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Election</option>
              {upcomingElections.map((election) => (
              <option key={election.id} value={election.id}>{election.topic}</option>
                
            ))}
              
              
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Add Candidate
          </button>
        </form>
      </div>
      <div className="col-span-4">
        <CandidateDetails />
      </div>
    </div>
  );
};

export default AddCandidate;
