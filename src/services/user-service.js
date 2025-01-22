const { destroy } = require("../controllers/user-controller");
const UserRepository  = require("../repository/user-repository");

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
}

module.exports = UserService