const express = require('express');
const suggestCountroler = require('../controllers/suggestCountroler');

const router = express.Router();

router
    .route('/')
    .get(suggestCountroler.getSuggestTable)
    .post(suggestCountroler.createNewSuggestGoal);

router
    .route('/:id')
    .get(suggestCountroler.getSuggest)
    .patch(suggestCountroler.updateSuggest)
    .delete(suggestCountroler.deleteSuggest);

module.exports = router;
