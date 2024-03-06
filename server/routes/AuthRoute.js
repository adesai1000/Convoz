const {Signup, Login, findUser} = require("../controller/AuthController")
const {userVerification} = require("../middleware/AuthMiddleware")
const router = require("express").Router();

router.post("/signup", Signup)
router.post("/login", Login)
router.post("/",userVerification)
module.exports = router;
