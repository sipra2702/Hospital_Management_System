const router = require("express").Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} = require("../controller/appointController");

router.post("/", protect, createAppointment);

router.get("/my", protect, getMyAppointments);


router.get("/", protect, adminOnly, getAllAppointments);

router.put("/:id", protect, adminOnly, updateAppointmentStatus);

router.delete("/:id", protect, adminOnly, deleteAppointment);

module.exports = router;
