const express = require('express');
const controller = require('../controllers/mimozaController');

const router = express.Router();
router.route("/mimoza/create").post(controller.create);
router.route("/mimoza/list").get(controller.list);
router.route("/mimoza/show/:id").get(controller.show);
router.route("/mimoza/delete/:id").delete(controller.delete);
router.route("/mimoza/update/:id").put(controller.update);

module.exports = router;