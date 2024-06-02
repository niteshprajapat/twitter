import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Register
export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(404).json({
                success: false,
                message: 'All Fields are Required!',
            });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                success: false,
                message: "User Already Exist.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });

        user.password = undefined;

        return res.status(201).json({
            success: true,
            message: 'User Registered Successfully',
            user,
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in Register API',
        })
    }
}

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Please Provide all Fields",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found.",
            });
        }

        const isMatchedPwd = await bcrypt.compare(password, user.password);
        if (!isMatchedPwd) {
            return res.status(404).json({
                success: false,
                message: "Invalid Credentials!",
            });
        }

        // token
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);


        user.password = undefined;
        return res.status(200).cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 900000),
        }).json({
            success: true,
            message: "User LoggedIn Successfully.",
            user,

        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Login API."
        })
    }
}


// Logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        }).json({
            success: true,
            message: 'User Logged out Successfully.',
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Logout API.",
        })
    }
}


// Bookmarks
export const bookmarks = async (req, res) => {
    try {
        const tweetId = req.params.id;
        const loggedInUserId = req.body.id;

        const user = await User.findById(loggedInUserId);

        if (user.bookmarks.includes(tweetId)) {
            // remove from bookmark
            await User.findByIdAndUpdate(
                loggedInUserId,
                {
                    $pull: {
                        bookmarks: tweetId
                    }
                },
                { new: true },
            );

            return res.status(200).json({
                success: true,
                message: "Removed from Bookmark.",
            });
        } else {
            // add to bookmar
            await User.findByIdAndUpdate(
                loggedInUserId,
                {
                    $push: {
                        bookmarks: tweetId,
                    }
                },
                { new: true },
            );

            return res.status(200).json({
                success: true,
                message: "Added to Bookmark",
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Bookmark API.",
        })
    }
}


// Get My Profile (LoggedIn User)
export const getMyProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            success: true,
            message: "Fetched Your Profile",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getMyProfile API.",
        })
    }
}


// Get Other Users (Other Accounts created)
export const getOtherUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const otherUsers = await User.find({ _id: { $ne: id } }).select("-password");
        if (!otherUsers) {
            return res.status(404).json({
                success: false,
                message: "Currently other users doesnt exist.",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Fetched Other Users ",
            totalOtherUsers: otherUsers.length,
            otherUsers,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in GetOtherUsers API.",
        })
    }
}


// Follow
export const follow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;

        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        if (!user.followers.includes(loggedInUserId)) {
            // follow
            await user.updateOne({ $push: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $push: { following: userId } });

            return res.status(200).json({
                success: true,
                message: `${loggedInUser.name} just followed to ${user.name}`,
            })
        } else {
            return res.status(400).json({
                success: false,
                message: `User already followed to ${user.name}`,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Follow API.",
        })
    }
}


// Unfollow
export const unFollow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;

        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        if (loggedInUser.following.includes(userId)) {
            await user.updateOne({ $pull: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $pull: { following: userId } });

            return res.status(200).json({
                success: true,
                message: `${loggedInUser.name} just unfollowed to ${user.name}`,
            })
        } else {
            return res.status(400).json({
                success: false,
                message: `User has not followed yet`,
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Unfollow API.",
        })
    }
}