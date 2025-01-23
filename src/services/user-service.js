const { destroy } = require("../controllers/user-controller");
const UserRepository  = require("../repository/user-repository");
const JWT = require('jsonwebtoken');
const {JWT_SECRET}= require("../config/configService");

class UserService{
    constructor() {
        this.userRepository = new UserRepository();
    }
   
    async create(data) { 
        try {
            const responce = await this.userRepository.create(data);
            return responce;
        } catch (error) {
            console.log("Something went wrong at the User service level");
            throw error;
        }
    }

    async destroy(id) {
          try {
              const responce = await this.userRepository.destroy(id);
              return responce;
          } catch (error) {
              console.log("Something went wrong at the use service layer");
              throw error;
          }
    }

    async createToken(user) {
        try {
            const token = JWT.sign(
                user, JWT_SECRET, { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.log("Something went worng at the service level in token cretetion ", error);
            throw error;
        }
    }

    async verifyToken(token) {
          try {
              const decode = JWT.verify(token, JWT_SECRET);
              return decode;
          } catch (error) {
            
          }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

}

module.exports = UserService