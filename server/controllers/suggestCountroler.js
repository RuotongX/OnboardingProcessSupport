const Suggest = require('../models/suggestModel');

// get the suggest table: all the suggest goals and corresponding activities
exports.getSuggestTable = async (req, res) => {
    try {
        const suggest = await Suggest.find().select('-__v');

        res.status(200).json({
            status: 'success',
            results: suggest.length,
            data: {
                suggest
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
exports.createNewSuggestGoal = async (req, res) => {
    try {
        const newSuggest = await Suggest.create(req.body);

        res.status(200).json({
            status: 'success',
            message: 'New suggest goal and corresponding suggest activities created',
            data: {
                suggest: newSuggest,
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err,
        });
    }
};

//update suggest goals and corresponding activities by id
exports.updateSuggest = async (req, res) => {
    try {
        const updatedSuggest = await Suggest.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            data: {
                suggest: updatedSuggest,
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
exports.deleteSuggest = async (req, res) => {
    try {
        await Suggest.findOneAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Suggest delete successed'
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err,
        });
    }
};