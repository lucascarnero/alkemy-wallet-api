const router = require("express").Router();
const {
  getAll,
  getById,
  insert,
  update,
  remove,
  makeDepositOrTransfer,
  getByUserId
} = require("../controllers/accounts");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/", isAuthenticated, isAdmin, getAll);
router.post("/", isAuthenticated, insert);
router.get("/me", isAuthenticated, getByUserId);
router.get("/:id", isAuthenticated, getById);
router.post("/:accountId", isAuthenticated, makeDepositOrTransfer);
router.put("/:id", isAuthenticated, isAdmin, update);
router.delete("/:id", isAuthenticated, isAdmin, remove);

module.exports = router;
