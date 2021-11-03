const Users= require('../models/users');

module.exports.read= async (req, res)=>{
    try{
        let users= await Users.find({});
        if(users.length==0){
            return res.json({
                message: "No user present right now"
            })
        }
        
        return res.json({
            users: users
        })
    }catch(err){
        res.json({
            message: "Error in finding users"
        })
    }
}

module.exports.create= async (req, res)=>{
    try{
        let user= await Users.findOne({username: req.body.username});
        if(user){
            return res.json({
                message: "User with this username already exists"
            })
        }
        else{
            Users.create(req.body);
            return res.json({
                message: "User created successfully"
            })
        }
    }catch(err){
        return res.json({
            message: "Error in creating user"
        })
    }
}

module.exports.update= async (req, res)=>{
    try{
        let user= await Users.findOne({username: req.body.username});
        if(!user){
            return res.json({
                message: "User with such username does not exist."
            })
        }

        if(req.body.new_name){
            user.name= req.body.new_name;
        }

        //if flag==false -> means a user with same username already exists
        let flag= true;
        if(req.body.new_username){
            let already_user= await Users.findOne({username: req.body.new_username});
            if(already_user){
                flag= false;
            }
            else user.username= req.body.new_username;
        }
        
        user.save();
        if(flag){
            return res.json({
                message: "User updated successfully"
            })
        }
        else{
            return res.json({
                message: "You cannot use this username as it is already taken. The name is updated successfully."
            })
        }
    }catch(err){
        res.json({
            message: "Error in updating user"
        })
    }
}

module.exports.delete= async (req, res)=>{
    try{
        let user= await Users.findOneAndDelete({username: req.params.username});
        if(!user){
            return res.json({
                message: `This user does not exist`
            })
        }
        return res.json({
            message: `User with username- ${req.params.username} deleted successfully`
        });
    }catch(err){
        return res.json({
            message: "Error in deleting user"
        })
    }
}

// module.exports.