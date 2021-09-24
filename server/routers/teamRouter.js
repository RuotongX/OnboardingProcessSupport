const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();

router
    .route('/')
    .get(teamController.getAllTeams)
    .post(teamController.createTeam);

router
    .route('/:id')
    .patch(teamController.updateTeam)
    .delete(teamController.deleteTeam);

module.exports = router;
