
module.exports.insertuser = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.body)
    const number = req.body.number;
    const password = req.body.password;
    request.input('number', sql.Numeric, number);
    try{
        request.input('password', sql.VarChar, password);
         await request.query("insert into Users(number,password) values (@number,@password)",
        function (err, recordset) {
            
            if (err) console.log(err)
            res.send(recordset);
        });
 }catch(e){
    console.log(e)
 }
 };
 

 module.exports.checkuserexists = async (req,res) =>{
    var sql = require("mssql");
    var request = new sql.Request();
    const bcrypt = require("bcrypt")
    const jwt = require("jsonwebtoken")
    require('dotenv').config();
    const {number,password} = req.body
    console.log(number,password)
    var matchrecruiter = false;
    var matchintern = false;
    try{
        request.input('number', sql.Numeric, number);
        request.input('password', sql.VarChar, password);
      const user = await request.query("Select * from Intern  where number = @number")
      const userrecruiter = await request.query("Select * from Recruiter  where number = @number")

      if (user.recordset[0]){
        console.log("INTERN")
        matchintern = await bcrypt.compare(password,user.recordset[0].password)
        if (matchintern){
          const accessToken = jwt.sign({
            "name" : user.recordset[0].name,
            "number" : user.recordset[0].number
          },
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn : '30m'}
          );
           console.log(accessToken)
          const refreshToken = jwt.sign({
            "name" : user.recordset[0].name,
            "number" : user.recordset[0].number
          },
          process.env.REFRESH_TOKEN_SECRET,
          {expiresIn : '1d'}
          );
          request.input('refreshtoken', sql.VarChar, refreshToken);
          await request.query("update Intern set refreshtoken = @refreshtoken  where number = @number")
          // res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
          res.cookie('jwt', refreshToken , {maxAge: 24 * 60 * 60 * 1000 , httpOnly:true , sameSite:'None' , secure:true});
           res.json({accessToken ,typeuser: "intern"});
         // return res.status(200).json({typeuser: intern,});
        }
        else
        { 
          return res.status(200).json({success: false,});
        }
      }
      else if(userrecruiter.recordset[0])
      {
        console.log("RECRUITER")
        matchrecruiter = await bcrypt.compare(password,userrecruiter.recordset[0].password)
        console.log(matchrecruiter)
        if(matchrecruiter)
        {
         const accessToken = jwt.sign({
            "name" : userrecruiter.recordset[0].name,
            "number" : userrecruiter.recordset[0].number
          },
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn : '30m'}
          );
          
           console.log(accessToken)
          const refreshToken = jwt.sign({
            "name" : userrecruiter.recordset[0].name,
            "number" : userrecruiter.recordset[0].number
          },
          process.env.REFRESH_TOKEN_SECRET,
          {expiresIn : '1d'}
          );
          request.input('refreshtoken', sql.VarChar, refreshToken);
          console.log(refreshToken)
          await request.query("update Recruiter set refreshtoken = @refreshtoken  where number = @number")
          res.cookie('jwt',refreshToken, {httpOnly:true,sameSite:'None',secure:true, maxAge: 24 * 60 * 60 * 1000});
           res.json({accessToken,typeuser: "recruiter"});
         
        }
        else {
          return res.status(200).json({success: false})
        }
      }
     
    }catch(e){
      return res.status(500).json({e})
    }
  }

  module.exports.users = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    try{     
         await request.query("select * from Intern",
        function (err, recordset) {       
            if (err) console.log("error in users controller")
            res.send(recordset);     
        });
 }catch(e){
    console.log(e)
 }
 };

 module.exports.changepassword = async(req,res)=>{

  var sql = require("mssql");
  var request = new sql.Request();
  var jwt_decode = require("jwt-decode");

  try{     
   
    var bcrypt = require("bcrypt");

    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const hashedpassword = await bcrypt.hash(newpassword,10);
    const accesstoken = req.headers.accesstoken;
    const decoded = jwt_decode(accesstoken);
    const number = decoded.number;

    request.input('number', sql.Numeric, number);
    request.input('password', sql.VarChar, hashedpassword);

  const user = await request.query("Select * from Intern  where number = @number")
  const userrecruiter = await request.query("Select * from Recruiter  where number = @number")
   
  if(user.recordset[0])
  {
    matchrecruiter = await bcrypt.compare(oldpassword,user.recordset[0].password)
    if(matchrecruiter)
    {
      await request.query("update Intern set password=@password")
      return res.status(200).json({success: true})
    }
    else
    {
      return res.status(200).json({success: false})
    }
  }
  if(userrecruiter.recordset[0])
  {
    matchrecruiter = await bcrypt.compare(oldpassword,userrecruiter.recordset[0].password)
    if(matchrecruiter)
    await request.query("update Recruiter set password=@password")
    return res.status(200).json({success: true})
  }
  else
  {
    return res.status(200).json({success: false})
  }

}catch(e){
console.log(e)
}

 }


module.exports.getuser = async (req,res)=>{
  var sql = require("mssql");
  var request = new sql.Request();
 
  const number = req.number;
  request.input('number', sql.Numeric, number);
  const user = await request.query("Select * from Intern  where number = @number")
  const userrecruiter = await request.query("Select * from Recruiter  where number = @number")

  try{
      if(user.recordset[0]){
       await request.query("select * from Intern where number = @number",function(err,recordset){
      if(err)
      {
        console.log(err);
      }
      res.send(recordset);
     })
    }
    else
    {
      await request.query("select * from Recruiter where number = @number",function(err,recordset){
        if(err)
        {
          console.log(err);
        }
        res.send(recordset);
       })
    }
    
}catch(e){
  console.log(e)
}
};


module.exports.getusertype = async (req,res)=>{
  var sql = require("mssql");
  var request = new sql.Request();
 
  const number = req.number;

  request.input('number', sql.Numeric, number);
  try{
     const user =   await request.query("select * from Intern where number = @number",);
     const userrecruiter =   await request.query("select * from Recruiter where number = @number",);
    
     if(user.recordset[0])
     {
      return res.status(200).json({type:"intern"})
     }
     else
     {
      return res.status(200).json({type:"recruiter"})
     }
    
}catch(e){
  console.log(e)
}
};


module.exports.getuserbynumber = async(num)=>{
  console.log("here in gubn")
  var sql = require("mssql");
  var request = new sql.Request();

  const number = num;
  request.input('number', sql.Numeric, number);
  const user = await request.query("Select * from Intern  where number = @number")
  const userrecruiter = await request.query("Select * from Recruiter  where number = @number")

  try{
      if(user.recordset[0]){
        console.log("user intern found")
        return user.recordset[0]
    }
    else
    {
     return userrecruiter.recordset[0]
    }
    
}catch(e){
  console.log(e)
}
};