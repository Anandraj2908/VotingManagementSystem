import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import db from '../db/index.js';

//post election
const addElection=asyncHandler(
    async(req,res)=>{
        const {topic} = req.body
        const SQL= 'INSERT INTO elections (topic) VALUES(?)'

        db.query(SQL, topic, (err,results) =>{
            if(err){
                return res.status(500).json(
                    new ApiResponse(500, "Error while adding new election into DB")
                );
            }
            return res.status(201).json(
                new ApiResponse(200, results ,"New Election added successfully")
            )
        })
    }
)

//get elections
const getElections=asyncHandler(
    async(req,res)=>{
        const SQL='SELECT * from elections'
        db.query(SQL, (err,results) =>{
            if(err){
                return res.status(500).json(
                    new ApiResponse(500, "Error while fetcing elections from DB")
                );
            }
            return res.status(201).json(
                new ApiResponse(200, results ,"Elections fetched successfully")
            )
        })
    }
)

//getElectionCandidates
const getElectionCandidates=asyncHandler(
    async(req,res)=>{
        const {election_id}=req.params;
        const SQL='SELECT * from candidates Where election_id=?';

        db.query(SQL,election_id, (err,results) =>{
            if(err){
                return res.status(500).json(
                    new ApiResponse(500, "Error while fetcing elections from DB")
                );
            }
            return res.status(201).json(
                new ApiResponse(200, results ,"Elections fetched successfully")
            )
        })
    }
)

//deleteElection
const deleteElection = asyncHandler(
    async(req,res) =>{
        const {id} = req.params;
        const SQL = 'DELETE FROM elections WHERE id=?';

        db.query(SQL,id,(err,results) =>{
            if(err){
                return res.status(500).json(
                    new ApiResponse(500, "Error while deleting election from DB")
                );
            }
            return res.status(201).json(
                new ApiResponse(200, results ,"Election deleted successfully")
            )
        })
    }
)

//post candidate
const addCandidate=asyncHandler(
    async(req,res)=>{
        const {name,election_id} = req.body
        const SQL= 'INSERT INTO candidates (name,election_id) VALUES(?,?)'
        const Values=[name,election_id];

        db.query(SQL, Values, (err,results) =>{
            if(err){
                return res.status(500).json(
                    new ApiResponse(500, "Error while adding new candidate into DB")
                );
            }
            return res.status(201).json(
                new ApiResponse(200, results ,"New Candidate added successfully")
            )
        })
    }
)

//get candidates
const getCandidates=asyncHandler(
    async(req,res)=>{
        const SQL = 'SELECT c.id, c.name, c.election_id, COUNT(v.candidate_id) AS votes FROM candidates c LEFT JOIN votes v ON c.id = v.candidate_id GROUP BY c.id, c.name, c.election_id';
        db.query(SQL, (err,results) =>{
            if(err){
                return res.status(500).json(
                    new ApiResponse(500, "Error while fetcing candidates from DB")
                );
            }
            return res.status(201).json(
                new ApiResponse(200, results ,"Candidates fetched successfully")
            )
        })
    }
)

//deleteCandidates
const deleteCandidate = asyncHandler(
    async(req,res) =>{
        const {id} = req.params;
        const SQL = 'DELETE FROM candidates WHERE id=?';

        db.query(SQL,id,(err,results) =>{
            if(err){
                return res.status(500).json(
                    new ApiResponse(500, "Error while deleting Candidate from DB")
                );
            }
            return res.status(201).json(
                new ApiResponse(200, results ,"Candidate deleted successfully")
            )
        })
    }
)

//getResult
const getElectionResult=asyncHandler(
    async(req,res)=>{
        const {election_id}=req.params;
        const SQL='SELECT v.*, c.name AS candidate_name FROM votes v JOIN candidates c ON v.candidate_id = c.id WHERE v.election_id = ?';

        db.query(SQL,election_id, (err,results) =>{
            if(err){
                return res.status(500).json(
                    new ApiResponse(500, "Error while fetcing elections from DB")
                );
            }
            return res.status(201).json(
                new ApiResponse(200, results ,"Elections fetched successfully")
            )
        })
    }
)



export {
    addElection,
    getElections,
    addCandidate,
    getCandidates,
    getElectionCandidates,
    getElectionResult,
    deleteElection,
    deleteCandidate
}