const router = require('express').Router();
const mediaController = require('./media.controller');
const formData = require('../../utils/formData');

router.route('/').post(formData, mediaController.send);

module.exports = router;