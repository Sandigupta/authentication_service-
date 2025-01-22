# Node.js Project Initialization and Setup

This guide provides step-by-step instructions to initialize and set up a Node.js project with essential dependencies and folder structure. Follow the steps below to build a well-structured backend application.

---

## **Project Initialization**

1. **Initialize the Project**

   ```bash
   npm init
   ```

   This will create a `package.json` file.

2. **Install Required Dependencies**

   ```bash
   npm install express
   npm install nodemon
   npm install dotenv
   npm install body-parser
   npm install jsonwebtoken
   npm install
   ```

---

## **Create File and Folder Structure**

Create the following files and folders to organize your project:

```plaintext
.env
.gitignore
src
 |- config
 |   |- configService.js
 |   |- config.json   // Move this file after initializing Sequelize
 |- middleware
 |- routes
 |- repository
 |- services
 |- utils
 |- controllers
```

---

## **Install Sequelize and Database Prototype**

1. Install Sequelize and Sequelize CLI:

   ```bash
   npm install sequelize sequelize-cli
   ```

2. Install the chosen database prototype (MySQL):

   ```bash
   npm install mysql2
   ```

---

## **Initialize Sequelize**

Run the following command to set up Sequelize in your project:

```bash
npx sequelize init
```

This command will generate the following folder structure:

```plaintext
models
migrations
seeders
config
 |- config.json
```

Move the `config.json` file into the `src/config` directory as specified in the folder structure.

---

## **Set the username, Password of Database and Databse Name**

Setup the config.json file 

```
{
  "development": {
    "username": "root",               //set the username:
    "password": "Sandeep@7809",       //set the password: 
    "database": "AUTH_DB_DEV",        //set the database name: "AUTH_DB_DEV"
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
---

---
## **Now create the same data base as we named in confing.json file in our local divice**

```
npx sequelize db:create

```
#
---

---
## Creating User model and migration file.

```
npx sequelize model: generate --name User --attributes email:string,password:string
    
```
# afetr creating the user model and migration file 

```
npm sequelize db:migrate

```
# we map the model file with the migration that define the schema whrere mmodel help use to connect with other directory like repository.
---

---
## **Final Notes**

- Use `nodemon` for running the application during development to enable automatic restarts on file changes.
- Store sensitive information, such as database credentials, in the `.env` file.
- Add the following entries to `.gitignore` to protect sensitive data and node modules:
  ```plaintext
  node_modules/
  .env
  config/config.json
  ```
- Follow best practices for organizing your code into separate folders for routes, controllers, services, and utilities.

---

### **Happy Coding!** 🎉

