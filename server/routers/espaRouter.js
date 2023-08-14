const express = require('express');
const controller = require('../controllers/espaController');

const router = express.Router();

router.route("/espa/create").post(controller.create);
router.route("/espa/list").get(controller.list);
router.route("/espa/show/:id").get(controller.show);
router.route("/espa/delete/:id").delete(controller.delete);
router.route("/espa/update/:id").put(controller.update);

module.exports = router;