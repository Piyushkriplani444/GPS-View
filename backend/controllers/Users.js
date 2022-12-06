import Users from "../models/UserModel.js";
import  bcrypt from "bcrypt";
import  jwt from  "jsonwebtoken";
import emailValidator from "email-validator";

export const getUsers = async(req,res)=>{
    try{
        const users = await Users.findAll({
            attributes:['id','name','email']
        });
        res.json(users);
    } catch(error){
        console.log(error);
    }
};

export const  Register = async(req,res) => {
    const  { name,email, password , confPassword } = req.body;
 
    if(!name )return res.status(400).json({msg: "Name cannot be empty"});
    if(!email )return res.status(400).json({msg: "Email cannot be empty"});
    
    if(!emailValidator.validate(email)){
        return res.status(400).json({msg: "Invalid Email format"});
  }
    
    const userEmail = await Users.findAll({
        attributes:['email']
    });
    
    const match = userEmail.filter(user => user.email === email);
    
    if(match.length) res.status(400).json({msg: "Already Registered user"});

    if(!password )return res.status(400).json({msg: "Password cannot be empty"});
    if(!confPassword )return res.status(400).json({msg: "Confirm Password cannot be empty"});
    if(password != confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match "});
   
    
    const salt=await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password,salt);

    try {
        await Users.create({
            name: name,
            email: email.toLowerCase(),
            password : hashPassword
        });
        res.json({msg: "Registration Successful"});
    }
    catch(error){
         console.log(error);

    }
};

export const Login = async(req,res) =>{
      const { email , password } = req.body;
      if(!email)return res.status(400).json({msg: "Email cannot be Empty"});
      if(!password)return  res.status(400).json({msg: "Password cannot be Empty"});
       try{
        const user = await Users.findAll({
            where:{
                email:req.body.email.toLowerCase()
            }
        });
        if(!user.length)return res.status(400).json({msg: "Email does not exist"});
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match)return res.status(400).json({msg: "Wrong Password"});

        const userId=user[0].id;
        const name= user[0].name;
        const email= user[0].email;
        const accessToken = jwt.sign({userId,name,email},  process.env.ACCESS_TOKEN_SECRET, {
            expiresIn:'15s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
            });
        
       await Users.update({refresh_token: refreshToken},{
              where:{
                id: userId
                }
                });
        
        res.cookie('refreshToken', refreshToken,{
               httpOnly: true,
               maxAge: 24 * 60 * 60 * 1000
            });
        
        res.json({ accessToken });     


       }catch(error)
       {
        console.log(error);
       }
};


export const Logout = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    
    const  user= await Users.findAll({
        where :{
            refresh_token: refreshToken
        }
    });

    if(!user[0]) return res.sendStatus(204);

    const userId = user[0].id;

    await Users.update({
        refresh_token : null
    }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);


};
