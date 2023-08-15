const express = require('express');
const controller = require('../controllers/espaController');

const router = express.Router();

router.param("id", controller.espaById);
router.route("/espa")
            .post(controller.create)
            .get(controller.list);
router.route("/espa/:id")
            .get(controller.show)
            .delete(controller.delete)
            .put(controller.update);

module.exports = router;