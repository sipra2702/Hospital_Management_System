const User = require("../model/User");

const getAllUsers = async (req, res) => {
    try {
        // Fetch only users (exclude admins)
        const users = await User.find({ role: "user" }).select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.error("Get Users Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    getAllUsers,
};
