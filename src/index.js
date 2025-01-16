const express = require("express");
const app = express();
const { PORT } = require("./config/configService");

const prepareAndStartServer= () => {
    


    app.listen(PORT, () => {
        console.log(`"Server started on port":${PORT}`);
    })
}

prepareAndStartServer();