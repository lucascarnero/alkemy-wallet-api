const router = require("express").Router();
const {
  getAll,
  getById,
  insert,
  update,
  remove,
  makeDepositOrTransfer,
} = require("../controllers/accounts");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/", isAuthenticated, isAdmin, getAll);
router.post("/", insert);
router.get("/:id", isAuthenticated, isAdmin, getById);
router.post("/:accountId", isAuthenticated, makeDepositOrTransfer);
router.put("/:id", isAuthenticated, isAdmin, update);
router.delete("/:id", isAuthenticated, isAdmin, remove);

module.exports = router;
