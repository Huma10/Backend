const UserService = require("../service/user.service");
const UserSchema = require("../schema/user.schema");
const Response = require("../service/Response");
const Util = require('../utility/util')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const us = new UserService();
const response = new Response();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reqBodyValidation = await UserSchema.login.validateAsync(req.body);
    if (reqBodyValidation) {
      // check if user exist
      const userExist = await us.isUserExist(email);
      if (userExist === null) {
        return res.status(400).send(response.response(404, 'Not Found', 'User not found', "error"));
      }
      if (userExist.email !== email) {
        return res.status(400).send(response.response(404, 'Not Found', 'Invalid username', "error"));
      }
      if (await bcrypt.compare(password, userExist.password)) {
        // Authneticate the user and issue token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: 3600, // 1 hr
          algorithm: "HS384"
        });
        const resultantData = {
          token: token,
          email: userExist.email,
          userName: userExist.userName,
          role: userExist.role,
          id: userExist._id,
        }
        res.cookie('token', token, { httpOnly: true })
        return res.status(200).send(response.response(200, 'Success', resultantData, 'success'));
      } else {
        return res.status(400).send(response.response(400, 'Bad Request', 'Invalid Password', 'error'));
      }
    }
  } catch (error) {
    if (error && error.details) {
      return res.status(400).send(response.response(400, 'Bad Request', Util.JoiErrorMessage(error), 'error'));
    }
    return res.status(500).send(response.response(500, 'Internale server error', 'Something went wrong', 'error'));
  }
};

exports.register = async (req, res) => {
  try {
    const { body } = req;
    const { email, userName } = body;
    const reqBodyValidation = await UserSchema.register.validateAsync(body);
    if (reqBodyValidation) {
      const userExist = await us.isUserExist(email);
      if (userExist) {
        return res.status(400).send(response.response(400, 'Bad Request', 'User already exist', 'error'));
      }
      // check for unique userName
      const userExistUserName = await us.isUserExistByUserName(userName);
      if (userExistUserName) {
        return res.status(400).send(response.response(400, 'Bad Request', 'Username already exist', 'error'));
      }
      const user = await us.createUser(body);
      return res.status(200).send(response.response(200, 'Success', 'User created successfully', user, 'success'));
    }
  } catch (error) {
    if (error && error.details) {
      return res.status(400).send(response.response(400, 'Bad Request', Util.JoiErrorMessage(error), 'error'));
    }
    return res.status(500).send(response.response(500, 'Internal server error', 'Something went wrong', 'error'));
  }
}

exports.findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await us.findUserById(id);
    if (user === null) {
      return res.status(400).send(response.response(400, 'Not found', 'User not found', 'error'));
    }
    return res.status(200).send(response.response(200, 'Success', user, 'success'));
  } catch (error) {
    return res.status(500).send(response.response(500, 'Internal server error', 'Something went wrong', 'error'));
  }
}

exports.logout = async (req, res) => {
  try {
    if (!req && !req.headers && !req.headers.authorization) {
      return res.status(400).send(response.response(400, 'Bad request', 'Invalid token', 'error'));
    }
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) })
    return res.status(200).send(response.response(200, 'Success', 'User logged out successfully', 'success'));
  } catch (err) {
    return res.status(500).send(response.response(500, 'Internal server error', 'Something went wrong', 'error'));
  }

}
exports.updateProfile = async (req, res) => {
  try {
    // Get the id
    const { id } = req.params;
    // Get data
    const { email, userName } = req.body;
    const data = {
      email: email,
      userName: userName
    }
    // Validate fields
    const reqBodyValidation = await UserSchema.profile.validateAsync(req.body);
    if (reqBodyValidation) {
      if (id != null) {
        const user = await us.findUserById(id);
        if (user == null) {
          return res.status(400).send(response.response(400, 'Not found', 'User not found', 'error'));
        }
        await us.updateProfile(id, data);
        return res.status(200).send(response.response(200, 'Ok', 'User profile updated successfully', 'success'));
      } else {
        return res.status(400).send(response.response(400, 'Bad Request', 'Id cannot be null', 'error'));

      }

    }

  } catch (error) {
    if (error && error.details) {
      return res.status(400).send(response.response(400, 'Bad Request', Util.JoiErrorMessage(error), 'error'));
    }
    return res.status(500).send(response.response(500, 'Internal server error', 'Something went wrong', 'error'));

  }
}
