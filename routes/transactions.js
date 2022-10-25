const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

const {
  getAll,
  getByUserId,
  getById,
  insert,
  update,
  remove,
} = require("../controllers/transactions");

router.get("/", isAuthenticated, getByUserId);
router.post("/", insert);
router.get("/:id", isAuthenticated, getById);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
