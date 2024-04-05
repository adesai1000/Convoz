const {Signup, Login, findUser, randomUsers, deleteProfile} = require("../controller/AuthController")
const {userVerification} = require("../middleware/AuthMiddleware")
const router = require("express").Router();

router.post("/signup", Signup)
router.post("/login", Login)
router.post("/",userVerification)
router.get('/random', randomUsers)
router.post('/delete', deleteProfile)
module.exports = router;
