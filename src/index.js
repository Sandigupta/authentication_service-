const express = require("express");
const app = express();
const { PORT } = require("./config/configService");
const bodyParser = require("body-parser");
const apiRouter = require('./routes/index');

const UserRepository = require('./repository/user-repository');
 const userRepository = new UserRepository(); 

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    
    app.use('/api', apiRouter);

    app.listen(PORT,async () => {
        console.log(`Server started on port: ${PORT}`);
        

        // const user =await userRepository.getById(1);
        // console.log(user);

    })
}

prepareAndStartServer();