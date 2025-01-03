import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import createPath from '../helpers/create-path.js';
import handleError from '../helpers/handle-error.js';



const getUserLogin = (req, res) => {
    const title = "User Login";
    const user = req.user;
    res.render(createPath('user-login'), { title, user });
};

const doUserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = {
        email: email,
        password: password
    };
    
    var error = null;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        handleError(res, "Authentication failed.");
        return;
    }
    
    if (existingUser == null) {
        handleError(res, "Authentication failed.");
        return;
    }

    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
        handleError(res, "Authentication failed.");
        return;
    }

    const token = jwt.sign({ user: { email: email } }, process.env.AUTH_JWT_TOKEN_SECRET, { expiresIn: "1h" });
    res
        .cookie("access_token", token, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === "production",
            secure: true
        })
        .redirect('/');
};

const getUserLogoff = (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .redirect("/");
};



export {
    getUserLogin,
    doUserLogin,
    getUserLogoff
};