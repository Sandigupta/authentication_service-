const UserRepository  = require("../repository/user-repository");
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/configService');
const bcrypt = require('bcrypt');
const { transporter } = require('../nodemailer/mailer');
const ValidationError=require('../utils/validation-error');
const AppErrors = require("../utils/error-handler");

class UserService{
    constructor() {
        this.userRepository = new UserRepository();
    }
   
    async create(data) { 
        try {
            const responce = await this.userRepository.create(data);
            return responce;
        } catch (error) {
            // console.log("EEEE:",error);
            if (error.name === 'SequelizeValidationError') {
                throw error;
            }
            console.log("Something went wrong at the User service level");
            // throw error;
            throw new AppErrors(
                'ServerError',
                'Something went wrong in service',
                'Logical issue found',
                400
            );
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
    
    async signIn(plainPassword,emailId) {
        try {
            //  step 1-> fetch the user using the email
             const user = await this.userRepository.getByEmail(emailId);
            // step 2-> campare incoming plain password with stores encrypted password  
             const passwordMatch = this.checkPassword(plainPassword, user.password);

             if (!passwordMatch) {
                 console.log("Password is incorrect");
                 throw { error: 'Incorrect password' };
            }
            
            // step 3-> if passwords match then create a token and send it to the user
            const newJWT = this.createToken({ email: user.email, id: user.id });
            
            // step-> 4 home work verifying mail using node mmailer
            const mailConfigurations = {

                // It should be a string of sender/server email
                from: 'sandeep.iit2022@gamil.com',
            
                to: 'sandi.tech24@gmail.com',
            
                // Subject of Email
                subject: 'Email Verification',
                
                // This would be the text of email body
                text: `Hi! There, You have recently visited 
                       our website and entered your email.
                       Please follow the given link to verify your email ${newJWT}`
            };
            
            transporter.sendMail(mailConfigurations, function(error, info){
                if (error) throw Error(error);
                console.log('Email Sent Successfully');
                console.log(info);
            });

            return newJWT;
         } catch (error) {
            console.log("Something went worng at the service level in signIn ", error);
            throw error;
         }
    } 

    async authanticate(token) {
        // try {the userId is object contain details about the user mail and it id from db.
        try{
            const userId = this.verifyToken(token);
            if (!userId) {
                throw {error: 'Invalid token'}
            }
            const user = this.userRepository.getById(userId.id);
            if (!user) {
                throw { error: 'No user with the corresponding token exists' };
            }
            return user.id;
        } catch (error) {
            console.log("Something went worng at the service level in authancticate ", error);
            throw error; 
        }
    };

    async authorisation(userId) {
        try {
            const responce = this.userRepository.isAdmin(userId);
            return responce;
        } catch (error) {
            console.log("Something went worng at the service level in authorisation ", error);
            throw error; 
        }
    }

    createToken(user) {
        try {
            const token = JWT.sign(
            user, JWT_SECRET, { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.log("Something went worng at the service level in token cretetion ", error);
            throw error;
        }
};

    verifyToken(token) {
          try {
              const decode = JWT.verify(token, JWT_SECRET);
              return decode;
          } catch (error) {
            console.log("Something went worng at the service level in token verification ", error);
            throw error;
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