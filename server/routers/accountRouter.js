const express = require('express');
const controller = require('../controllers/accountController');

const router = express.Router();
router.param("id", (req, res, next) => {

});
router.route("/account/create").get(controller.create);

module.exports = router;