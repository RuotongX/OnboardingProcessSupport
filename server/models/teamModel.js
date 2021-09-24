const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: [true, 'A team must have a team name'],
        trim: true,
    },
    teamLeader: {
        type: String,
        required: [true, 'A team must have a team leader'],
        trim: true,
    },
    expectedTasks: {
        type: [String],
        required: [true, 'A team must have at least expect task for onboarders'],
        trim: true,
    },
    programmingLanguage: {
        type: [String],
        required: [true, 'A team must have at least one programming language'],
        trim: true,
    },
    framework: {
        type: [String],
        required: [true, 'A team must have at least one current using framework'],
        trim: true,
    },
    code_test_techniques: {
        type: [String],
        required: [true, 'A team must have at least one current using techiques for coding and testing'],
        trim: true,
    },
    database: {
        type: [String],
        required: [true, 'A team must have at least one current using database'],
        trim: true,
    },
    documentSources: {
        type: [String],
        required: [true, 'A team must have at least one source for sroing team documents'],
        trim: true,
    },
    code_test_tools: {
        type: [String],
        required: [true, 'A team must have at least one current using tools for coding and testing'],
        trim: true,
    },
    architectural: {
        type: [String],
        required: [true, 'A team must have at least one current using architectural'],
        trim: true
    },
    qualityAssurance: {
        type: [String],
        required: [true, 'A team must have at least one current using quality assurance'],
        trim: true
    },
    developmentProcess: {
        type: [String],
        required: [true, 'A team must have at least one current using development process'],
        trim: true
    },
    plan_techniques: {
        type: [String],
        required: [true, 'A team must have at least one current using techiques for planning'],
        trim: true,
    },
    plan_tools: {
        type: [String],
        required: [true, 'A team must have at least one current using tools for planning'],
        trim: true,
    },
    communication_tools: {
        type: [String],
        required: [true, 'A team must have at least one current using tools for communication'],
        trim: true,
    },
    autonomous: {
        type: [String],
        required: [true, 'A team must have at least one autonomous'],
        trim: true,
    },
    work_in_virtual: {
        type: String,
        trim: true,
    },
    virtual_tools: {
        type: String,
        trim: true,
    },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
