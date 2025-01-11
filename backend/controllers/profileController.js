const Profile = require('../models/profileModel');

// @desc Create a user Profile
// @route POST /profile/setprofile
// @access Protected 

const setProfile = async (req, res) => {
    const { name, email, phoneno, education, skills, experience, location } = req.body;
    const user = req.user.id;

    if (!name || !email || !phoneno || !education || !skills || !experience || !location || !user) {
        return res.status(400).json({
            message: "Please enter all the fields"
        })
    }
    const profileExists = await Profile.findOne({ "email": email })
    if (profileExists) {
        return res.status(400).json({
            message: "Profile already exists for this user"
        })
    }
    const profile = await Profile.create({ name, email, phoneno, education, skills, experience, location, "user": user })
    if (profile) {
        return res.status(201).json({ profile });
    } else {
        return res.status(400).json({ message: 'Invalid profile data' });
    }
}

// @desc get profile information 
// @route /profile/getinfo
// @access protected

const getProfileInfo = async (req, res) => {
    const profile = await Profile.findOne({ "user": req.user.id }).populate("myJobs");
    if (!profile) {
        return res.status(404).json({
            message: "Profile not found"
        })
    }
    return res.status(200).json({
        profile: profile
    });
}

// @desc Deleting Profile
// @route profile/delete
// @access protected

const deleteProfile = async (req, res) => {
    try {
        const user = req.user.id; // Get user ID from authenticated request

        // Find and delete the profile in one step
        const profile = await Profile.findOneAndDelete({ user });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        return res.status(200).json({
            message: "Profile deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting profile:", error);
        return res.status(500).json({
            message: "Failed to delete profile"
        });
    }
};

// @desc Updating the Profile
// @route PUT profile/update
// @access protected

const updateProfile = async (req, res) => {
    const user = req.user.id;
    try {
        const updatedProfile = await Profile.findOneAndUpdate({ "user": user }, { $set: req.body }, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({
                message: "Profile not found"
            })
        }
        return res.status(200).json({ profile: updatedProfile })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

module.exports = { setProfile, deleteProfile, updateProfile, getProfileInfo }