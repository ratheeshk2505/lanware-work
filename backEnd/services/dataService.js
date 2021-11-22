const db = require('./db')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const signup = (pname, email, phone, pwrd, create_date, isAdmin, isActive, isDeleted)=>{
    return db.User.findOne({email})
    .then(user=>{
      if(user){
        return{
          statusCode:422,
          status:false,
          message:"User Already Exist, Please Login"
        }   
      }
      else{
        const newUser = new db.User({
            "pname": pname,
            "email":email,
            "phone": phone,
            "pwrd": bcryptjs.hashSync(pwrd, 10),
            "create_date": create_date,
            "isAdmin": isAdmin,
            "isActive": isActive,
            "isDeleted": isDeleted
        })
        newUser.save()
        return{
          statusCode:200,
          status:true,
          message:"User Registered Successfully.. Please Login to Continue."
        } 
      }
    })
}

const login = (email, pwrd) => {
    return db.User.findOne({email})
    .then(user=>{
      if(bcryptjs.compareSync(pwrd, user.pwrd)){
        const token = jwt.sign({currentUser:email},'secretkey@123')
        return{
          statusCode:200,
          status:true,
          message_user:"Login Successful.",
          message_admin:"Logged in as Admin.",
          token,
          currUser:user.pname,
        } 
      }
      else{
        return {
          statusCode:422,
          status:false,
          message:"Invalid Credentials."
        }
      }
      
    })
}

const addProduct = (pname, prodName, price, description, imgPath)=>{
    return db.User.findOne({pname})
    .then(user=>{
      if(user){
        const newProduct = new db.Product({
            prod_name: prodName,
            price: price,
            description: description,
            img_path: imgPath
            })
            newProduct.save()
        
        return {
          statusCode:200,
          status:true,
          message:"Product Added Successfully."
        }
      }
    }) 
  }


const allUsers = (admin) => {
    return db.User.find({pname: {$ne: admin}, isDeleted: {$ne: true}})
    .then(user=>{
      if(user){
        return {
          statusCode:200,
          status:true,
          allUsersExAdmin:user,
          messageYes: "All Users",
          messageNo:"No Users Found"
        }
      }
      else{
        return {
          statusCode:422,
          status:false,
          message:"Operation Denied."
        }
      }
    })
  
}

const userDetails = (userId) => {
    return db.User.findOne({_id:userId})
    .then(user=>{
      if(user){
        return {
          statusCode:200,
          status:true,
          details:user
        }
      }
    })
}

const deleteUser = (userId) => {
    return db.User.updateOne({_id:userId}, { $set: {"isDeleted": true }})
    .then(user=>{
      if(user){
        console.log(`delete called, match found, soft delete performed`);
        return {
          statusCode:200,
          status:true,
          message:"Soft Deleted"
        }
      }
    })
  }

  const status = (userId, status) => {
    return db.User.updateOne({_id:userId}, { $set: {"isActive": (!status) }})
    .then(user=>{
      if(user){
        console.log(`status changed`);
        return {
          statusCode:200,
          status:true,
          message:"Soft Deleted"
        }
      }
    })
  }

  const allProducts = (user) => {
    return db.Product.find({})
    .then(user=>{
      if(user){
        return {
          statusCode:200,
          status:true,
          products:user,
        }
      }
      else{
        return {
          statusCode:422,
          status:false,
          message:"Operation Denied."
        }
      }
    })
  
}

module.exports = { signup, login, allUsers, userDetails, addProduct, deleteUser, status, allProducts}