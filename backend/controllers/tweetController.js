import Tweet from "../models/tweetModel.js";
import User from "../models/userModel.js";


// Create Tweet
export const createTweet = async (req, res) => {
    try {
        // console.log("req.user -> ", req.user);
        // const id = req.user;
        // console.log("id ", id);

        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(404).json({
                success: false,
                message: 'Please Provide All Fields',
            });
        }

        const tweet = await Tweet.create({
            description,
            userId: id,
        });

        return res.status(201).json({
            success: true,
            message: "Tweet Created Successfully.",
            tweet,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in CreateTweet API.',
        });
    }
}

// Delete Tweet
export const deleteTweet = async (req, res) => {
    try {
        const { id } = req.params;

        await Tweet.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Tweet Deleted Successfully.",
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in DeleteTweet API.',
        });
    }
}


// LikeOrDislike Tweet
export const likeOrDislikeTweet = async (req, res) => {
    try {
        const tweetId = req.params.id;
        const loggedInUserId = req.body.id;

        const tweet = await Tweet.findById(tweetId);

        if (tweet.like.includes(loggedInUserId)) {
            // Dislike
            await Tweet.findByIdAndUpdate(
                tweetId,
                {
                    $pull: {
                        like: loggedInUserId
                    }
                },
                { new: true },
            );

            return res.status(200).json({
                success: true,
                message: "User disliked the tweet.",
            });

        } else {
            // Like
            await Tweet.findByIdAndUpdate(
                tweetId,
                {
                    $push: {
                        like: loggedInUserId
                    }
                },
                { new: true },
            );

            return res.status(200).json({
                success: true,
                message: "User liked the tweet.",
            });

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in likeOrDislikeTweet API.',
        });
    }
}

// GetALLTweets
export const getAllTweets = async (req, res) => {
    try {
        // loggedIn user tweets + following user tweets
        const { id } = req.params;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({ userId: id });
        const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUserId) => {
            return Tweet.find({ userId: otherUserId });
        }));


        const allTweets = loggedInUserTweets.concat(followingUserTweets);

        return res.status(200).json({
            success: false,
            message: "Fetched All Tweets",
            totalTweets: allTweets.length,
            allTweets,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in getAllTweets API.',
        });
    }
}


// Get Following Tweets
export const getFollowingTweets = async (req, res) => {
    try {
        const { id } = req.params;
        const loggedInUser = await User.findById(id);
        const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUserId) => {
            return Tweet.find({ userId: otherUserId });
        }));


        const allTweets = [].concat(followingUserTweets);

        return res.status(200).json({
            success: false,
            message: "Fetched All Tweets",
            totalTweets: allTweets.length,
            allTweets,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in getFollowingTweets API.',
        });
    }
}