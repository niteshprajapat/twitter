import jwt from 'jsonwebtoken';


export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req?.cookies;
        console.log("req.cookies -> ", req.cookies);


        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized, Please login first!",
            });
        }


        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(404).json({
                success: false,
                message: "Invalid Token.",
            });
        }

        req.user = decoded.userId;
        next();

    } catch (error) {
        console.log(error);
    }
}
