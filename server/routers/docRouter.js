const express = require('express');
const controller = require('../controllers/docController');
const router = express.Router();

router.route("/doc/upload").post(controller.upload);
router.route("/doc/download").get(controller.download);
router.delete("/doc/delete/:id").delete(controller.delete);

module.exports = router;