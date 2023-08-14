const express = require('express');
const controller = require('../controllers/presentationController');

const router = express.Router();
router.route("/presentation/create").post(controller.create);
router.route("/presentation/list").get(controller.list);
router.route("/presentation/show/:id").get(controller.show);
router.route("/presentation/delete/:id").delete(controller.delete);
router.route("/presentation/update/:id").put(controller.update);

module.exports = router;