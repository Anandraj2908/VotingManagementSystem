import React,{useEffect,useState} from 'react';
import axios from 'axios';

const CandidateDetails = () => {
  
  const [candidates, setCandidates] = useState([]);
  useEffect(() =>{

    axios.get('http://localhost:8000/api/v1/admin/getcandidates')
      .then(res => {
        
        if(res.data.data.length>0){
          setCandidates(res.data.data);
        }
      })
      .catch(err => {
        console.log('Error', err);
        
      });
  },[])


  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Candidate Details</h2>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Serial No.</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={candidate.id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{candidate.name}</td>
                <td className="px-4 py-2 border">{candidate.votes}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateDetails;
