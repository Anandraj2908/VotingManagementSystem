import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewResultPage from '../resultPage/ViewResultPage';
const UpcomingE = () => {
  const [upcomingElections, setUpcomingElections] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/admin/getelections')
      .then(res => {
        if (res.data.data.length > 0) {
          setUpcomingElections(res.data.data);
        }
      })
      .catch(err => {
        console.log('Error', err);
      });
  }, []);

  const [selectedElection, setSelectedElection] = useState(null);
  const handleViewResult = (election) => {
    setSelectedElection(election); 
  };

  const handleCloseResult = () => {
    setSelectedElection(null); 
  };

  const handelDelete= (eID) => {
    console.log(eID)
    axios.delete(`http://localhost:8000/api/v1/admin/deleteelection/${eID}`)
    .then(res => {
      if (res.data) {
        console.log('DELETED:',res.data)
        window.location.reload();
      }
    })
    .catch(err => {
      console.log('Error', err);
    });
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Elections List</h2>
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Serial No.</th>
              <th scope="col" className="px-6 py-3">Election Name</th>
              {/* <th scope="col" className="px-6 py-3">Candidates</th> */}
              <th scope="col" className="px-6 py-3">Result</th>
              <th scope="col" className="px-6 py-3">Modify</th>
            </tr>
          </thead>
          <tbody>
            {upcomingElections.map((election, index) => (
              <tr key={election.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{election.topic}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleViewResult(election)} className="text-blue-600 dark:text-blue-500 hover:underline m-2">View</button>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handelDelete(election.id)} className="text-red-600 dark:text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedElection && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-md">
            <button onClick={handleCloseResult} className="absolute top-10 right-10 -mt-4 -mr-4 text-red-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ViewResultPage data={selectedElection} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingE;
