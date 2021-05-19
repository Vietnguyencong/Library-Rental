https://drive.google.com/file/d/11uq3QFLCiLxjFVnIib0ogOrOIbpPSQeJ/view?usp=sharing

Link above is to the file:

# Hosted web application
User FrontEnd Client (Library): https://uhlib.cc
Admin and employees FrontEnd: https://admin.uhlib.cc

# Introduction 
A library database project for CS3380 with Dr. Uma Ramamurthy

Team Members: Aiden, Isaac, Minh, Viet, Yoseline

## Folder hierarchy

Backend\uhlib-api
Frontend\uhlibadmin
Frontend\uhlibclient

### Host requirements

Our application stack includes a MySQL database that interfaces with a NodeJS API backend. We utilize Express for a back end application framework.
There are two ReactJS frontends one for users and one for admin/employees.
For our dependencies, the serving host would only need nodejs and npm.

### Environment variables setup

Our MySQL database just needs to be setup to run on PORT 3306 and can be restored from the provided backup.

Inside Backend\uhlib-api\.env , should be created and modified with the environment variables for the backend API service:

DB_HOST = uhlib.cc     
DB_USER = uhlib
DB_PASSWORD = #RcEsf44
DB_NAME = library-schema
SECRET_KEY = "secretkeyhere"

The only field that needs to be changed should be the DB_HOST and DB_PORT  (localhost and a port other than 3306 if needed)

### Build and run development servers

To run the api, enter the Backend\uhlib-api folder and run : 
npm i
nodemon index.js

To install and run the admin front enter the Frontend\uhlibadmin folder and run:
npm i && PORT=3000 npm start

To install and run the client front end enter the Frontend\uhlibclient folder and run:
npm i && PORT=3001 npm start


The api will run from localhost:5000/api/					
The client frontend will run from localhost:3000/  	Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The admin frontend will run from localhost:3001/  	Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### Current live server setup

Our current set-up uses reverse proxy to forward these ports back to our domain at https://uhlib.cc/  
for the admin at https://admin.uhlib.cc/
and for the api at https://uhlib.cc/api/

For running everything from localhost, the toggle just needs to be made for any calls to our live server at https://uhlib.cc to http://localhost in our code

### Access credentials

Admin side 
https://admin.uhlib.cc/#/
Username: atram@gmail.copm
Password: test
-----------------------------------------------
Client side below
https://uhlib.cc/
Username: test@gmail.com
Password: test


