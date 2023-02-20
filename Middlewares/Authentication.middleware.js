var jwt = require('jsonwebtoken');

const Authentication=(req,res,next)=>{
    const token=req.headers.authorization
    console.log(token)
   if(token){
    jwt.verify(token, 'ujjwal', (err, decoded)=> {
        if(decoded){
            // req.body.user=decoded.userId
            // console.log(decoded.userId)
            next()
        }else{
            res.send("Authorixation Failed")
        }
      });
   }else{
    res.send("/token not available")
   }
}

module.exports={
    Authentication
}