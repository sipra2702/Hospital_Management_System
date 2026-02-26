const router = require("express").Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getAllUsers } = require("../controller/adminController");

router.get("/", protect, adminOnly, getAllUsers);

module.exports = router;
