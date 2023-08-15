const express = require('express');
const controller = require('../controllers/accountController');
const fileupload = require('express-fileupload');
const router = express.Router();

router.param("id", controller.accountById);
router.use("/account", fileupload());
router.route("/account")
            .post(controller.create)
            .get(controller.list);
router.route("/account/:id")
            .get(controller.show)
            .delete(controller.delete)
            .put(controller.update);
router.route("/account/verify").post(controller.verify);
router.route("/account/toadmin/:id").put(controller.toAdmin);
module.exports = router;