# A simple shopping website with MERN stack

## Technology
MongoDB, Express, React, Node.js

# Getting Started

## Setting up environment
To run this project, you need to set up your own environment variables. Here's how: 
1. Create a file named `.env` in the backend directory
2.  Add these variable into .env file <br/> 
		 PORT  = 8000
         MONGO_URI  = your mongoDB URI
         SECRET_KEY  = your secret key (for signing jwt)
         
 You also need to install yarn. Here's how:
 1. Open your terminal and type command ```npm install --global yarn```

## installation
#### open the terminal and run following command
```git clone https://github.com/Nagalin-Punyakalin/CS266.git``` <br />
```cd CS266/frontend``` <br />
```yarn add i``` <br />
```yarn dev``` <br />

#### open other terminal
```cd CS266/backend``` <br />
```yarn add i``` <br />
```yarn dev```<br />

### setting up your mongoDB schema
#### you need to add account schema to your database in order to be able to login with following fields
 username:  String, <br/>
 password:  String, <br/>
 role:  String <br/>
username contains username that you used to login , password contains a hashed password, role has two role, user or admin
