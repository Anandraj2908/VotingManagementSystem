import {Router} from "express";

import {
    addElection,
    getElections,
    addCandidate,
    getCandidates,
    getElectionCandidates,
    getElectionResult,
    deleteElection,
    deleteCandidate
} from "../controllers/admin.controller.js"

const router=Router();

router.route("/addelection").post(addElection);
router.route("/getelections").get(getElections);
router.route("/addcandidate").post(addCandidate);
router.route("/getcandidates").get(getCandidates);
router.route("/getelectioncandidates/:election_id").get(getElectionCandidates);
router.route("/getelectionresult/:election_id").get(getElectionResult);
router.route("/deleteelection/:id").delete(deleteElection);
router.route("/deletecandidate/:id").delete(deleteCandidate);
export default router;