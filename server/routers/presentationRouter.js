const express = require('express');
const controller = require('../controllers/presentationController');

const router = express.Router();

router.param("id", controller.presById);
router.route("/presentation")
            .post(controller.create)
            .get(controller.list);
router.route("/presentation/:id")
            .get(controller.show)
            .delete(controller.delete)
            .put(controller.update);

module.exports = router;