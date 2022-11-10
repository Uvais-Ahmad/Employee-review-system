const User = require('../models/users');

module.exports.login = function( req , res ){
    res.render('_login',{
        title : 'Log In'
    });
}

module.exports.register = function( req , res ){
    res.render('_register',{
        title : 'Registeration'
    })
}

module.exports.create = async function(req , res ){
    // console.log('Req body : ', req.body);
    let data = req.body;

    //Pass must be equal
    if( data.password != data.confirm_password){
        return res.redirect('back');
    }
    //check user is Already Registered or not
    let user = await User.findOne({email:data.email});

    // If this is new user
    if(!user){
        User.create( data , function( err , user ){
            if(err){console.log('Error occur while creating user : ',err); return;}
            console.log("User Created : ",user);
            
        });
        return res.render('_login',{
            title : 'Log In'
        })
    }
    //if its existing  user
    else{
        return res.render('_login',{
            title : 'Log In'
        })
    }
}