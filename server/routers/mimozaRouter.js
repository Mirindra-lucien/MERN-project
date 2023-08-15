const express = require('express');
const controller = require('../controllers/mimozaController');
const fileupload = require('express-fileupload');

const router = express.Router();

router.param("id", controller.mimozaById);
router.use("/mimoza", fileupload());
router.route("/mimoza")
            .post(controller.create)
            .get(controller.list);
router.route("/mimoza/:id")
            .get(controller.show)
            .delete(controller.delete)
            .put(controller.update);

module.exports = router;