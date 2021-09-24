const Team = require('../models/teamModel');

// get the onboarder list
exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find().select('-__v');

        res.status(200).json({
            status: 'success',
            results: teams.length,
            data: {
                teams
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

//create new suggest goals and corresponding activities
exports.createTeam = async (req, res) => {
    try {
        const newTeams = await Team.create(req.body);

        res.status(200).json({
            status: 'success',
            message: 'New team created',
            data: {
                team: newTeams,
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err,
        });
    }
};

//update onboarder by id
exports.updateTeam = async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            data: {
                team: updatedTeam,
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err,
        });
    }
};

//update suggest goal corresponding activities by goal id
exports.deleteTeam = async (req, res) => {
    try {
        await Team.findOneAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Team delete successed'
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err,
        });
    }
};

