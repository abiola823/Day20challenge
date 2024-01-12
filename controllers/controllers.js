const { registerSchema } = require("../Model/validationSchema.js");
const userModel = require("../Model/model.js");
const Jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require('express');
const{send} = require('../utils/sendMail.js');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
app.use(cookieParser());

const { createRefreshToken, generateFreshToken, sendRefreshToken } = require("../utils/generatetoken.js");

const homepage = (req, res) => {
    res.send("Welcome to the 30 days of the code challenge");
};

const registerUser = async (req, res) => {
    try {
        registerSchema(req, res);
        const { username, email, password, role } = req.body;//object destructuring
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.status(403).send('User exists');
        } else {
            const createUser = await userModel.create({
                username,
                email,
                role,
                password // password has been hashed in the schema file before saving to database

            });
            res.status(201).send("Created Successfully");
            // await send.sendMail({
            //     to: email,
            //     subject: `Welcome ${username}`,
            //     html: `
            //         <div style= "background-color: orangered; color: white; padding:10px">
            //             <h1>Hi  ${username}</h1>
            //             <p>You are welcome, we're happy to have you as our new Member<p/>
            //             <p> This is my API created for my 30days of code challenge at kodecamp</p>
                        
            //         </div>`
            // });
            return;
        }

    } catch (error) {
        console.log(error);
    }


}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doesUserExist = await userModel.findOne({ email });
        if (!doesUserExist && await userModel.matchPassword(password)) {
            throw new Error("Invalid email or password");
        } else {
            const { email: userEmail, _id, role } = doesUserExist;
            const refreshToken = createRefreshToken(userEmail, _id, role);
            //   doesUserExist.refreshToken = refreshToken;
            sendRefreshToken(res, refreshToken);
            req.refreshToken = refreshToken;
            
            const token = Jwt.sign({
                email: userEmail,
                userId: _id,
                role
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });

            return res.send({
                message: "Sign in Successful",
                token
            });


        }
    } catch (error) {
        console.log(error);
    }

}
const logout = async (req, res) => {
    const clear = res.clearCookie('refreshToken', {httpOnly: true});
    // Logic here for also remove refreshtoken from db
   res.send({
        message: 'Logged out',
    });
}


const updateUser = async (req, res) => {
    try {
        const upd = await userModel.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }, { new: true });
        if (upd) return res.json({ updatedUser: upd });
    } catch (error) {
        console.log(error);
    }
}
const deleUser = async (req, res) => {
    const del = await userModel.findByIdAndDelete({ _id: req.params.user });

    if (del) {
        res.status(200).json({
            message: 'User deleted successfully'
        });
    } else { res.send('user does not exist') }
}

const getAllUsers = async (req, res) => {
    res.json({ allUsers: await userModel.find() })
}

const getNewToken = async (req, res) => {
  generateFreshToken(req, res)
};



module.exports = {
    homepage,
    registerUser,
    loginUser,
    updateUser,
    deleUser,
    getAllUsers,
    getNewToken,
    logout

}