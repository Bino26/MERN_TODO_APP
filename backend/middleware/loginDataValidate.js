const userModel = require('../model/user.model.js');
const bcrypt = require('bcrypt');

exports.loginDataValidate = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist with email'
            });
        }

        // check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password'
            });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
