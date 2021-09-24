const Onboarder = require('../models/onboarderModel');

// get the onboarder list
exports.getAllOnboarders = async (req, res) => {
    try {
        const onboarders = await Onboarder.find().select(['firstname', 'lastname', 'company', 'team_name', 'onboarding_program_status']);

        res.status(200).json({
            status: 'success',
            results: onboarders.length,
            data: {
                onboarders
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// get a specific onboarder
exports.getOnboarder = async (req, res) => {
    try {
        const onboarder = await Onboarder.findById(req.params.id).select('-__v');
        res.status(200).json({
            status: 'success',
            data: {
                onboarder
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

//create new suggest goals and corresponding activities
exports.createNewOnboarder = async (req, res) => {
    try {
        const newOnboarder = await Onboarder.create(req.body);

        res.status(200).json({
            status: 'success',
            message: 'New onboarder created',
            data: {
                onboarder: newOnboarder,
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
exports.updateOnboarder = async (req, res) => {
    try {
        const updatedOnboarder = await Onboarder.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            data: {
                onboarder: updatedOnboarder,
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
exports.deleteOnboarder = async (req, res) => {
    try {
        await Onboarder.findOneAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Onboarder delete successed'
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err,
        });
    }
};

