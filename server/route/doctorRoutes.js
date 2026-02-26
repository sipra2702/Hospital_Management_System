const router = require("express").Router();
const {
  createDoctor,
  getAllDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
  toggleAvailability,
} = require("../controller/doctorController");

const { protect, adminOnly } = require("../middleware/authMiddleware");


router.get("/", getAllDoctors);

router.get("/:id", getSingleDoctor);


router.post("/", protect, adminOnly, createDoctor);

router.put("/:id", protect, adminOnly, updateDoctor);

router.delete("/:id", protect, adminOnly, deleteDoctor);

router.patch("/:id/availability", protect, adminOnly, toggleAvailability);

module.exports = router;
