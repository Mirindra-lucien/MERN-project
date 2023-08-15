const express = require('express');
const fileupload = require('express-fileupload');
const controller = require('../controllers/docController');
const router = express.Router();

router.use("/doc", fileupload());
router.route("/doc")
            .post(controller.upload)
            .get(controller.list);
            
router.param("id", controller.docById);
router.route("/doc/:id")
            .get(controller.download)
            .delete(controller.delete);

module.exports = router;