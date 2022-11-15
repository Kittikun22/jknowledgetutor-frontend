const express = require('express')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const { getUsers,
    createUser,
    updateUser,
    deleteUser,
    Signin,
    authToken,
    getAUser,
    getAUserMeta,
    updateAUser } = require('../controller/users-control')

const userRoute = express.Router()

userRoute.get('/users', getUsers)
userRoute.post('/create-user', jsonParser, createUser)
userRoute.put('/update', updateUser)
userRoute.delete('/delete/:id', deleteUser)
userRoute.post('/signin', jsonParser, Signin)
userRoute.post('/authsignin', jsonParser, authToken)
userRoute.get('/getAUser/:user_id', getAUser)
userRoute.get('/getAUserMeta/:user_id', getAUserMeta)
userRoute.put('/updateAUser', updateAUser)

module.exports = userRoute