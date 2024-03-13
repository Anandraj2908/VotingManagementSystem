import {Router} from "express";

import {
    registerUser,
    loginUser,
    getCurrentUser,
    casteVote,
    logoutUser,
    getVotedElection
} from "../controllers/user.controller.js"

const router=Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/getcurrentuser").get(getCurrentUser)
router.route("/castevote").post(casteVote)
router.route("/logout").post(logoutUser)
router.route("/getvotedelections/:user_id").get(getVotedElection)
export default router;