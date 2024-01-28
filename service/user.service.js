const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const salt =  10;
class UserService {
    
    async createUser(body) { 

        const user = body;
        const { email, password, userName } = user;
        // hash password
        const hashedPassword = await bcrypt.hash(password, salt);
        // create user
        const newUser = await UserModel.create({ email, password: hashedPassword, userName, role:'TEACHER' });
        return newUser;
    }

    async isUserExist(email) {
        const user = await UserModel.findOne({ email });
        if (user) {
            return user;
        }
        return null;
    }

    async isUserExistByUserName(username) {
        const user = await UserModel.findOne({ userName:username });
        if (user) {
            return user;
        }
        return null;
    }

    async findUserById(id) {
        const user = await UserModel.findOne({ _id:id });
        if (user) {
            return user;
        }
        return null;
    }

    async updateProfile(id, data) {
      const user = await UserModel.findByIdAndUpdate({_id:id}, { $set:{email: data.email, userName: data.userName}})
      if(user) {
        return user;
      }
      return null;
    }
}
module.exports = UserService;