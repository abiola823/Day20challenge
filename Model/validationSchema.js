const joi = require('joi');
const registerSchema = (req,res) => {
const registerValidationSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string()
});

const {error: registerValidationError} = registerValidationSchema.validate(req.body);

if(registerValidationError) return res.send(registerValidationError.message);
}


module.exports = {
    registerSchema
} 

