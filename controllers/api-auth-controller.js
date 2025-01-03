import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import handleError from '../helpers/api-handle-error.js';


const doToken = async (req, res) => {
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
    
    res.json({ token });
};


export {
    doToken,
}