const router = require("express").Router();
const { login, me } = require("../controllers/auth");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

router.post("/login", login);
router.get("/me", isAuthenticated, me);

module.exports = router;
