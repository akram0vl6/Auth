const Router = require("express").Router
const router = Router()

const controller = require("../Controller/auth-controller");

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.get("/user", controller.user);
router.delete("/user/:id", controller.delete);

module.exports = router