const router = require("express").Router();
const {
  getAll,
  getById,
  insert,
  update,
  remove,
} = require("../controllers/users");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/", isAuthenticated, isAdmin, getAll);
router.post("/", insert);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", isAuthenticated, isAdmin, remove);

module.exports = router;
