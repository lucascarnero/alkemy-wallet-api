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
router.post("/", insert);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
