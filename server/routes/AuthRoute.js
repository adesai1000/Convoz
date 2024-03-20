const {Signup, Login, findUser, randomUsers} = require("../controller/AuthController")
const {userVerification} = require("../middleware/AuthMiddleware")
const router = require("express").Router();

router.post("/signup", Signup)
router.post("/login", Login)
router.post("/",userVerification)
router.get('/random', randomUsers)
module.exports = router;
