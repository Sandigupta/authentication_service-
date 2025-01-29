const express = require('express');
const app = express();
const { PORT } = require('./config/configService');
const { DB_SYNC } = require('./config/configService');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/index');

// const UserRepository = require('./repository/user-repository');
//  const userRepository = new UserRepository(); 
const ServiceRepository = require("./services/user-service");
const serviceRepository = new ServiceRepository();
const db = require('./models/index');

const { User} = require('./models/index');
const {Role} = require('./models/index');

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    
    app.use('/api', apiRouter);

    app.listen(PORT, async () => {
        console.log(`Server started on port: ${PORT}`);
        
        if (DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }

        // const u1 = await User.findByPk(3);
        // const r1 = await Role.findByPk(1);
        // u1.addRole(r1);
        // console.log(u1);
        // console.log(r1);
        // const u1 = await User.findByPk(3);
        // const r1 = await Role.findByPk(1);
        // const responce = await u1.hasRole(r1);
        // console.log(responce);


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