const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/profiles.controller')
router.get('/',controller.getProfile)
router.post('/',controller.onPostProfile)
module.exports = router