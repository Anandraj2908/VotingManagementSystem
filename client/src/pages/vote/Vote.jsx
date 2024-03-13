import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Vote = () => {
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [electionCandidates, setElectionCandidates] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user
        const currentUserResponse = await axios.get('http://localhost:8000/api/v1/users/getcurrentuser');
        setCurrentUser(currentUserResponse.data.data);
  
        // Fetch elections
        const electionsResponse = await axios.get('http://localhost:8000/api/v1/admin/getelections');
        const fetchedElections = electionsResponse.data.data;
        console.log('Fetched Elections:', fetchedElections);
  
        if (fetchedElections.length > 0) {
          // Fetch voted elections for current user
          const votedElectionsResponse = await axios.get(`http://localhost:8000/api/v1/users/getvotedelections/${currentUserResponse.data.data.id}`);
          const votedElections = votedElectionsResponse.data.data;
          console.log('Voted Elections:', votedElections);
  
          // Fetch candidates for each election
          const promises = fetchedElections.map(election =>
            axios.get(`http://localhost:8000/api/v1/admin/getelectioncandidates/${election.id}`)
          );
  
          const candidateResponses = await Promise.all(promises);
          const candidatesData = candidateResponses.map((response, index) => ({
            electionId: fetchedElections[index].id,
            candidates: response.data.data
          }));
          setElectionCandidates(candidatesData);
  
          // Update upcomingElections with voted field
          const updatedElections = fetchedElections.map(election => {
            const voted = votedElections.some(e => e.election_id === election.id);
            return { ...election, voted };
          });
          setUpcomingElections(updatedElections);
          console.log('Updated Elections:', updatedElections);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/')
      }
    };
  
    fetchData();
  }, []);
  
  

  
  

  const handleVote = async (candidateId, election) => {
    try {
      const data = {
        user_id: currentUser.id,
        candidate_id: candidateId,
        election_id: election.id
      };
      console.log('Voting', data);
      const voteResponse = await axios.post('http://localhost:8000/api/v1/users/castevote', data);
      console.log('Vote casted', voteResponse.data.success);
  
      const updatedElections = upcomingElections.map(e => {
        if (e.id === election.id) {
          return { ...e, voted: true };
        }
        return e;
      });
      setUpcomingElections(updatedElections);
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };
  

  return (
    <div>
      {upcomingElections.map(election => (
        <div key={election.id} className="m-6">
          <h2 className="text-xl font-semibold mb-4">{election.topic}</h2>
          <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${election.voted ? '' : ''}`}>
            {election.voted && (
              <div className="absolute inset-0 flex justify-center items-center bg-gray-300 bg-opacity-50 z-10">
                <div className="text-4xl text-red-600 font-bold">Vote Casted</div>
              </div>
            )}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Candidate Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {electionCandidates.map(candidateData => {
                  if (candidateData.electionId === election.id) {
                    return candidateData.candidates.map(candidate => (
                      <tr key={candidate.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                          {candidate.name}
                        </td>
                        <td className="px-6 py-4">
                          {!candidate.voted && (
                            <button onClick={() => handleVote(candidate.id, election)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                              Vote
                            </button>
                          )}
                        </td>
                      </tr>
                    ));
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Vote;
