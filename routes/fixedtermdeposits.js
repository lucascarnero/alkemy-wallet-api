const router = require("express").Router();
const {
  getAll,
  getById,
  insert,
  update,
  remove,
} = require("../controllers/fixedtermdeposits");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/", isAuthenticated, getAll);
router.post("/", isAuthenticated, insert);
router.get("/:id", isAuthenticated, getById);
router.put("/:id", isAuthenticated, isAdmin, update);
router.delete("/:id", isAuthenticated, isAdmin, remove);

module.exports = router;
