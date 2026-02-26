const Doctor = require("../model/Doctor");

exports.createDoctor = async (req, res) => {
  try {
    const { name, specialization, experience, fees } = req.body;

    const doctor = await Doctor.create({
      name,
      specialization,
      experience,
      fees,
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("Create Doctor Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create doctor",
    });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    console.error("Get Doctors Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
    });
  }
};

exports.getSingleDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error("Get Doctor Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor",
    });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("Update Doctor Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update doctor",
    });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("Delete Doctor Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete doctor",
    });
  }
};

exports.toggleAvailability = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    doctor.available = !doctor.available;
    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Availability updated",
      data: doctor,
    });
  } catch (error) {
    console.error("Toggle Availability Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update availability",
    });
  }
};
