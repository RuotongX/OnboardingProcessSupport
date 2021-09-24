const mongoose = require('mongoose');

const onboarderSchema = new mongoose.Schema({
    lastname: {
        type: String,
        required: [true, 'A onboarder must have a lastname'],
        trim: true,
    },
    firstname: {
        type: String,
        required: [true, 'A onboarder must have a firstname'],
        trim: true,
    },
    age: {
        type: Number,
        required: [true, 'A onboarder must have a age'],
        trim: true,
    },
    description: {
        type: String,
    },
    tittle: {
        type: String,
        required: [true, 'A onboarder must have a tittle'],
    },
    onboarding_program_status: {
        type: String,
        enum: ['No onboarding program', 'Not start yet', 'Doing', 'Complete', 'Withdraw'],
        required: [true, 'A onboarder must have a onboarding program status'],
        default: 'No onboarding program'
    },
    team_id: {
        type: String,
        required: [true, 'A onboarder must have a team'],
    },
    skill_matrix: {
        type: [{
            tech: String,
            level: Number
        }],
        required: [true, 'Onboarder must have a skill matrix'],
    },
    goal_list: {
        type: [String],
        trim: true,
    },
    onboarding_date: {
        // type: String,
        // required: [true, 'A onboarder must have an onbording date'],
        // default: new Date().toLocaleDateString(),
        type: Date,
        required: [true, 'A onboarder must have an onbording date'],
    },
    onboarding_date_activity: {
        type: [{
            activity: String,
            source: String,
            progress: {
                type: String,
                enum: ['Not start yet', 'Doing', 'Complete', 'Withdraw'],
                default: 'Not start yet'
            }
        }],
    },
    iteration1_start_date: {
        // type: String,
        // required: [true, 'A onboarder must have an onbording date'],
        // default: new Date().toLocaleDateString(),
        type: Date,
        required: [true, 'A onboarder must have an onbording date'],
    },
    iteration1_end_date: {
        // type: String,
        // required: [true, 'A onboarder must have an onbording date'],
        // default: new Date().toLocaleDateString(),
        type: Date,
        required: [true, 'A onboarder must have an onbording date'],
    },
    iteration1_feedback: {
        type: String,
        trim: true,
    },
    iteration1_activity: {
        type: [{
            activity: String,
            source: String,
            progress: {
                type: String,
                enum: ['Not start yet', 'Doing', 'Complete', 'Withdraw'],
                default: 'Not start yet'
            }
        }],
    },
    iteration2_start_date: {
        // type: String,
        // required: [true, 'A onboarder must have an onbording date'],
        // default: new Date().toLocaleDateString(),
        type: Date,
        required: [true, 'A onboarder must have an onbording date'],
    },
    iteration2_end_date: {
        // type: String,
        // required: [true, 'A onboarder must have an onbording date'],
        // default: new Date().toLocaleDateString(),
        type: Date,
        required: [true, 'A onboarder must have an onbording date'],
    },
    iteration2_feedback: {
        type: String,
        trim: true,
    },
    iteration2_activity: {
        type: [{
            activity: String,
            source: String,
            progress: {
                type: String,
                enum: ['Not start yet', 'Doing', 'Complete', 'Withdraw'],
                default: 'Not start yet'
            }
        }],
    },
    iteration3_start_date: {
        // type: String,
        // required: [true, 'A onboarder must have an onbording date'],
        // default: new Date().toLocaleDateString(),
        type: Date,
        required: [true, 'A onboarder must have an onbording date'],
    },
    iteration3_end_date: {
        // type: String,
        // required: [true, 'A onboarder must have an onbording date'],
        // default: new Date().toLocaleDateString(),
        type: Date,
        required: [true, 'A onboarder must have an onbording date'],
    },
    iteration3_feedback: {
        type: String,
        trim: true,
    },
    iteration3_activity: {
        type: [{
            activity: String,
            source: String,
            progress: {
                type: String,
                enum: ['Not start yet', 'Doing', 'Complete', 'Withdraw'],
                default: 'Not start yet'
            }
        }],
    }
});

const Onboarder = mongoose.model('Onboarder', onboarderSchema);

module.exports = Onboarder;
