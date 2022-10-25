const router = require("express").Router();
const {
  getAll,
  getById,
  insert,
  update,
  remove,
} = require("../controllers/catalogue");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/", getAll);
router.post("/", isAuthenticated, isAdmin, insert);
router.get("/:id", getById);
router.put("/:id", isAuthenticated, isAdmin, update);
router.delete("/:id", isAuthenticated, isAdmin, remove);

module.exports = router;
