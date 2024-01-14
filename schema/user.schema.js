const Joi = require('joi');

const login = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
})

const register = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});


module.exports = {
    login,
    register
}