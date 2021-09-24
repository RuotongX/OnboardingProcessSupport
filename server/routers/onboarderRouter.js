//import modules
const express = require('express');
const onboarderController = require('../controllers/onboarderController');

const router = express.Router();

router
    .route('/')
    .get(onboarderController.getAllOnboarders)
    .post(onboarderController.createNewOnboarder);

router
    .route('/:id')
    .patch(onboarderController.updateOnboarder)
    .delete(onboarderController.deleteOnboarder);

module.exports = router;
