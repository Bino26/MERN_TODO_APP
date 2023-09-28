const userModel = require('../model/user.model');
const emailValidator = require('email-validator'); 

exports.signupDataValidate = async (req, res, next) => {
    const {name, email, password} = req.body;

    // check if user miss any field
    if(!(name && email && password)) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        })
    }

    // validate name
    if(name.length < 3) {
        return res.status(400).json({
            success: false,
            message: 'Name must be atleast 3 char'
        })
    }
    if(name.length > 16) {
        return res.status(400).json({
            success: false,
            message: 'Name must be less than 16 char'
        })
    }

    // validate email
    if(!(emailValidator.validate(email))) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        })
    }

    // check if user has already signup with the same email
    const existingUser = await userModel.findOne({email});
    if(existingUser) {
        return res.status(400).json({
            success: false,
            message: 'User already signup with the same email'
        })
    }

    // validate password
    if(password.length < 3) {
        return res.status(400).json({
            success: false,
            message: 'password must be atleast 3 char'
        })
    }
    if(password.length > 9) {
        return res.status(400).json({
            success: false,
            message: 'password must be less than 10 char'
        })
    }

    next();
    
}