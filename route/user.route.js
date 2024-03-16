const {User} = require("../model/user.model")
const express = require("express")
const bcrypt = require("bcrypt")
const {sequelize} = require("../config/db")
const jwt = require("jsonwebtoken")
//redis
const redis = require("redis")

const client= redis.createClient();
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

const userRoute = express.Router()

userRoute.post("/register",async (req,res)=>{
    const {name,email,password,role} = req.body
    await sequelize.sync()
    try {
        bcrypt.hash(password,4 ,async (err,secure_pass)=>{
            if(err){
                console.log(err);
                res.send("something went wrong")
            }else{
                await User.create({name, email, password:secure_pass,role})
                res.send("user created success")
            }
        })
    } catch (error) {
        res.send("error in register the user")
        console.log(error);
    }
})

userRoute.post("/login",async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({ where: { email } })
        console.log(user);
        if(!user){
            res.send("please signup first")
        }else{
            const hash_pass = user?.password
            bcrypt.compare(password, hash_pass,async (err,result)=>{
                if(result){
                    const normal_token = jwt.sign({userID:user.id, role : user.role},"N_unlock", {expiresIn: '3h'});
                    const refresh_token = jwt.sign({userID:user.id, role : user.role},"R_unlock", {expiresIn:'2h'});
                    const response = await client.SETEX("normal_token" ,3600 ,normal_token)
                    const response_ref = await client.SETEX("refresh_token" ,5000 ,refresh_token)
                    res.send({msg:"login success",  normal_token, refresh_token})
                }else{
                    console.log(err);
                    res.send("something went wrong, login again")
                }
            })
        }
       
    } catch (error) {
        res.send("error in login the user")
        console.log(error);
    }
})

module.exports = {userRoute}