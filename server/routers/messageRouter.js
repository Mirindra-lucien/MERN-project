const express = require('express');
const controller = require('../controllers/messageController');

const router = express.Router();

router.route("/message/send").put(controller.send);
router.route("/message/list").get(controller.list);
router.route("/message/delete/:id").delete(controller.delete);
router.route("/message/update/:id").put(controller.update);

module.exports = router;