const signInUser = async (req,res)=>{
    res.json({message: 'User successfully logged in ! ✅'})
};

const signUpUser = async (req,res)=>{
    res.json({message: 'User successfully signed up ! ✅'})
};

module.exports ={
    signInUser,
    signUpUser,
}; 