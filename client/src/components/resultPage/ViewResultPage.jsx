import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewResultPage = ( election ) => {
    const [candidateVotes, setCandidateVotes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/admin/getelectionresult/${election.data.id}`);
                const result = response.data.data;

                if (Array.isArray(result) && result.length > 0) {
                    const votes = countVotes(result);
                    setCandidateVotes(votes);
                } else {
                    console.log("No data available for this election.");
                }
            } catch (error) {
                console.log('Error fetching election result: ', error);
            }
        };

        fetchData();
    }, [election]);

    // Function to count the votes for each candidate
    const countVotes = (result) => {
        const votesMap = {};
        result.forEach(item => {
            votesMap[item.candidate_name] = (votesMap[item.candidate_name] || 0) + 1;
        });
        return votesMap;
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Election Results [{election.data.topic}]</h2>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Candidate Name</th>
                        <th className="px-4 py-2">Vote Count</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(candidateVotes).map(([candidateName, voteCount], index) => (
                        <tr key={index} className='bg-gray-300'>
                            <td className="border px-4 py-2">{candidateName}</td>
                            <td className="border px-4 py-2">{voteCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewResultPage;
