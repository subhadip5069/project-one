const user = require('../../model/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AdminController{
    signup = async(req,res) => {
        try {
            const {name,email,password} = req.body;
            const userExist = await user.findOne({email});
            if(userExist){
                return res.status(400).json({message: 'User already exists'});
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const userCreated = await user.create({name,email,password:hashedPassword,role:'admin'});
            return res.status(200).json({message: 'User created successfully',userCreated});
        } catch (error) {
            console.log(error);
        }
    }

    login = async(req,res) => {
        try {
          const {email,password} = req.body;
            const userExist = await user.findOne({email});
            if(!userExist){
                return res.status(400).json({message: 'User not found'});
            }
            const isPasswordValid = await bcrypt.compare(password,userExist.password);
            if(!isPasswordValid){
                return res.status(400).json({message: 'Invalid password'});
            }
            const token = jwt.sign({email:userExist.email,role:userExist.role},process.env.JWT_SECRET);
            return res.status(200).json({message: 'Login successful',token});
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AdminController();