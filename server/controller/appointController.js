const Appointment = require("../model/Appointment");

exports.createAppointment = async (req, res) => {
    try {
        const { doctor, date } = req.body;

        // Prevent double booking (optional but recommended)
        const existing = await Appointment.findOne({
            doctor,
            date,
            status: { $in: ["pending", "approved"] },
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Slot already booked",
            });
        }

        const appointment = await Appointment.create({
            user: req.user.id, // from protect middleware
            doctor,
            date,
        });

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            data: appointment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to book appointment",
        });
    }
};

// ===============================
// GET MY APPOINTMENTS (USER)
// ===============================
exports.getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({
            user: req.user.id,
        })
            .populate("doctor", "name specialization fees")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: appointments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch appointments",
        });
    }
};

// ===============================
// GET ALL APPOINTMENTS (ADMIN)
// ===============================
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("user", "name email")
            .populate("doctor", "name specialization")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: appointments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch appointments",
        });
    }
};

// ===============================
// UPDATE STATUS (ADMIN)
// ===============================
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({
            success: true,
            message: "Appointment status updated",
            data: appointment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update appointment",
        });
    }
};

// ===============================
// DELETE APPOINTMENT (ADMIN)
// ===============================
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        await appointment.deleteOne();

        res.status(200).json({
            success: true,
            message: "Appointment deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete appointment",
        });
    }
};
