import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import db from '../db/index.js';

import jwt from "jsonwebtoken";



//login
const loginUser=asyncHandler(
    async(req,res)=>{
        if(!( req.body.username && req.body.password)){
            return res.status(400).json(
                new ApiResponse(400, "Username and password is required","false")
            );
        }

        const SQL= "SELECT * FROM users where username = ?";
        db.query(SQL,[req.body.username], (err,result) => {
            if(err){
                return res.status(500).json(
                    new ApiResponse(500, "Error while fetching user from DB","false")
                );
            }
            else {
                if (result.length > 0) { 
                    if (result[0].password === req.body.password) {
                        const refreshToken = jwt.sign(
                            {
                                _id: result[0].id,
                                username: result[0].username,
                                email: result[0].email
                            },
                            "secret",
                            {
                                expiresIn: "1d",
                            }
                        )
                        
                        return res
                        .status(201)
                        .cookie("refreshToken",refreshToken)
                        .json(
                            new ApiResponse(200, result, "User logged in")
                        );
                    } else {
                        return res.status(404).json(
                            new ApiResponse(404, "Invalid user credentials","false")
                        );
                    }
                } else {
                    return res.status(404).json(
                        new ApiResponse(404, "Invalid user credentials","false")
                    );
                }
            }
        })
    }
);

//register
const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    console.log(email, username, password);
  
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    const values = [email, username, password];
  
    db.query(SQL, values, (err, result) => {
      if (err) {
        return res.status(500).json(
          new ApiResponse(500, 'Error while registering user into DB')
        );
      }
  
      const loginUserSQL = 'SELECT * FROM users WHERE username = ?';
      db.query(loginUserSQL, [username], (loginErr, loginResult) => {
        if (loginErr) {
          return res.status(500).json(
            new ApiResponse(500, 'Error while logging in after registration')
          );
        }
        if (loginResult.length > 0) {
          if (loginResult[0].password === password) {
            const refreshToken = jwt.sign(
              {
                _id: loginResult[0].id,
                username: loginResult[0].username,
                email: loginResult[0].email,
              },
              'secret',
              {
                expiresIn: '1d',
              }
            );
  
            return res
              .status(201)
              .cookie('refreshToken', refreshToken)
              .json(new ApiResponse(200, loginResult, 'User logged in after registration'));
          } else {
            return res.status(404).json(new ApiResponse(404, 'Invalid user credentials'));
          }
        } else {
          return res.status(404).json(new ApiResponse(404, 'Invalid user credentials'));
        }
      });
    });
  });
  

//logoutUser
const logoutUser=asyncHandler(
    async(req,res)=>{
        try{
            res.clearCookie('refreshToken')
            return res
            .status(200)
            .json(
                new ApiResponse(200,  "User logged out")
            );
            
        }catch (error) {
            return res.status(404).json(
                new ApiResponse(404, "Unauthorized","false")
            );
        }
    }
)

//getCurrentUser
const getCurrentUser=asyncHandler(
    async(req,res)=>{
        let token = req.headers.cookie;
        if (token) {
            token = token.substring('refreshToken='.length);
        } else {
            return res.status(404).json(
                new ApiResponse(404, "Unauthorized","false")
            );
        }
        try{
            const decodedToken = jwt.verify(token, 'secret');
            const id=decodedToken._id
            const username = decodedToken.username;
            const email = decodedToken.email;
            return res
            .status(200)
            .json(
                new ApiResponse(200, {
                    id,
                    username,
                    email
                  }, "User logged in")
            );
            
        }catch (error) {
            return res.status(404).json(
                new ApiResponse(404, "Unauthorized","false")
            );
        }
    }
)

//castVote
const casteVote=asyncHandler(
    async(req,res)=>{
        const{user_id,candidate_id,election_id}=req.body;

        const SQL= 'INSERT INTO votes (user_id,candidate_id,election_id) VALUES(?,?,?)'
        const Values = [user_id,candidate_id,election_id]

        db.query(SQL, Values, (err,results) =>{
            if(err){
                return res.status(500).json(
                    new ApiResponse(500, "Error while registering vote into DB")
                );
            }

            const eleVoterSQL = 'INSERT INTO election_voter (user_id,election_id) VALUES(?,?)';
            const eleValues = [user_id,election_id]
            db.query(eleVoterSQL, eleValues, (eleError,eleResult) =>{
                if(eleError){
                    return res.status(500).json(
                        new ApiResponse(500, "Error while registering vote into DB")
                    );
                }
                else{
                    return res.status(201).json(
                        new ApiResponse(200, results ,"Vote Casted successfully")
                    )
                }
            }) 
        })
    }
)





//getVotes
const getVotedElection=asyncHandler(
    async(req,res)=>{
        const {user_id} = req.params;
        const SQL=`SELECT * from election_voter where user_id=?`;

        db.query(SQL,user_id,(err,result) => {
            if(err){
                return res.status(500).json(
                    new ApiResponse(500, "Error while fetching votes ")
                );
            }
            else{
                return res.status(201).json(
                    new ApiResponse(200, result ,"Votes Fetched successfully")
                )
            }
        })
    }
)






export {
    loginUser,
    registerUser,
    getCurrentUser,
    casteVote,
    logoutUser,
    getVotedElection
}