const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        pname: String,
        email: String,
        phone: Number,
        pwrd: String,
        create_date: String,
        isAdmin: Boolean,
        isActive: Boolean,
        isDeleted: Boolean 
    },
    {
        timestamps: true
    }
);

const productSchema = mongoose.Schema(
    {
        prod_name: String,
        price: Number,
        description: String,
        img_path: String
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

const Product = mongoose.model('Product', productSchema)

module.exports = { User, Product }

