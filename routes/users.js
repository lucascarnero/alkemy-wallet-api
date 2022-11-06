const router = require("express").Router();
const {
  getAll,
  getById,
  insert,
  update,
  remove,
  blockAccount,
  unblockAccount,
  exchangeProduct,
  resetPassword
} = require("../controllers/users");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/", isAuthenticated, isAdmin, getAll);
router.patch("/resetPassword/:userId", resetPassword);
router.post("/", insert);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", isAuthenticated, isAdmin, remove);

router.patch("/block/:accountId", isAuthenticated, blockAccount);
router.patch("/unblock/:accountId", isAuthenticated, unblockAccount);

router.patch("/product/:productId", isAuthenticated, exchangeProduct);

module.exports = router;
