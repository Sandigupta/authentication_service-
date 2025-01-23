const express = require("express");
const app = express();
const { PORT } = require("./config/configService");
const bodyParser = require("body-parser");
const apiRouter = require('./routes/index');

// const UserRepository = require('./repository/user-repository');
//  const userRepository = new UserRepository(); 
const ServiceRepository = require("./services/user-service");
const serviceRepository = new ServiceRepository();

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    
    app.use('/api', apiRouter);

    app.listen(PORT, async () => {
        console.log(`Server started on port: ${PORT}`);
        

        // const user =await userRepository.getById(1);
        // console.log(user);

        // const newtoken = serviceRepository.createToken({
        //     email: "sandeep@123gmail.com",
        //     id:1
        // });
        // console.log("new token is:",newtoken);
        
        // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmRlZXBAMTIzZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTczNzU4MjQzNiwiZXhwIjoxNzM3NTg2MDM2fQ.Xfm4zzjEmLWpVcXhGSjBrYg1THeGlsX_2L6O2lx2Woo"
        // const data = serviceRepository.verifyToken(token);
        // console.log(data);
    })
}

prepareAndStartServer();