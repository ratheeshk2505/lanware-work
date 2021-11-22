const express = require('express')
const jwt = require('jsonwebtoken')
const dataServices = require('./services/dataService')
const cors = require('cors')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const path = require('path');
const multer = require('multer')
const port = process.env.PORT || 3000;

dotenv.config()
const app = express()
app.use(express.json())

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB Atlas is connected to ${connect.connection.host}`);
    }
    catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1)
    }
}

connectDb()

app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))

const jwtMiddleWare = (req,res,next)=>{
    try{
        const token = req.headers["x-token"]
        const data = jwt.verify(token,'secretkey@123')
        next()
    }
    catch{
        const result = ({
            statusCode:401,
            status:false,
            message:"Please Login to Transact..."
          })
          res.status(result.statusCode).json(result)
    }
}


app.post('/signup', (req,res)=>{
    dataServices.signup(req.body.pname, req.body.email, req.body.phone, req.body.pwrd, req.body.create_date, req.body.isAdmin, req.body.isActive, req.body.isDeleted).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/login', (req,res)=>{
    dataServices.login(req.body.email, req.body.pwrd).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/addproduct', jwtMiddleWare, (req,res)=>{
    dataServices.addProduct(req.body.pname, req.body.prodName, req.body.price, req.body.decription, req.body.imgPath).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/allusers', jwtMiddleWare, (req,res)=>{
    dataServices.allUsers(req.body.admin).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/allproducts', jwtMiddleWare, (req,res)=>{
    dataServices.allProducts(req.body.user).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/userdetails', jwtMiddleWare, (req,res)=>{
    dataServices.userDetails(req.body.userId).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/delete', jwtMiddleWare, (req,res)=>{
    dataServices.deleteUser(req.body.userId).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/status', jwtMiddleWare, (req,res)=>{
    dataServices.status(req.body.userId, req.body.status).then(result=>{
        res.status(result.statusCode).json(result)
    })
})





app.listen(port, ()=>{
    console.log(`server started at ${port}`)
})