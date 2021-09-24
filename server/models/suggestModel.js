const mongoose = require('mongoose');

const suggestSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Suggested goal must have a valid ID'],
        unique: true,
        trim: true,
    },
    goal: {
        type: String,
        required: [true, 'Suggested goal is required'],
        unique: true,
        trim: true,
    },
    very_high_contribution_activity: {
        type: [String],
        required: [true, 'Suggested goal must have at least one suggested very high contribution activities'],
        trim: true,
    },
    high_contribution_activity: {
        type: [String],
        required: [true, 'Suggested goal must have at least one suggested high contribution activities'],
        trim: true,
    }
});

const Suggest = mongoose.model('Suggest', suggestSchema);

module.exports = Suggest;