module.exports.getuserprofile = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    const jwt_decode = require('jwt-decode')
    console.log("in getuserprofile")
    const number = req.number;
    request.input('number', sql.Numeric, number);
    const numberofposts = await request.query("select count(postid) as c from postintern where usernumber = @number")
    console.log(numberofposts.recordset[0].c)
    const posts = numberofposts.recordset[0].c
    request.input('numberofposts', sql.Numeric, posts);
    await request.query("update Intern set numberofposts = @numberofposts where number = @number")
    console.log(number)

    try{   
  const user = await request.query("Select * from Intern  where number = @number")
  const userrecruiter = await request.query("Select * from Recruiter  where number = @number")

   if(user.recordset[0])
   {
    await request.query("select * from Intern where number=@number",
    function (err, recordset) {       
        if (err) console.log("error in users controller")
        res.send(recordset);     
    });
   }
   if(userrecruiter.recordset[0])
   {
    await request.query("select * from Recruiter where number = @number",
    function (err, recordset) {       
        if (err) console.log("error in users controller")
        res.send(recordset);     
    });
   }
 }catch(e){
    console.log(e)
 }
 };

 module.exports.updateuserprofile = async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    console.log("in updateuserprofile")
    console.log(req.body)
    const name = req.body.name;
    const email = req.body.email;
    const companyname = req.body.companyname;
    const number = req.number;
    const bio = req.body.bio;
    
     
    try{
        if(req.file)
        {
     const photo = req.file.filename;
     request.input('photo', sql.VarChar,photo);   
     request.input('name', sql.VarChar, name);
     request.input('companyname', sql.VarChar, companyname);
     request.input('email', sql.VarChar, email);
     request.input('bio', sql.VarChar, bio);
     request.input('number', sql.Numeric, number);
     await request.query("update comments set profilephoto = @photo where usernumber = @number")
     await request.query("update postrecruiter set profilephoto = @photo where number = @number")
     await request.query("update postrecruiter set username = @name where number=@number")
     await request.query("update Recruiter set name = @name , companyname = @companyname , bio = @bio, email = @email , profilephoto = @photo where number = @number")
        }
        else{
            request.input('name', sql.VarChar, name);
            request.input('companyname', sql.VarChar, companyname);
            request.input('email', sql.VarChar, email);
            request.input('bio', sql.VarChar, bio);
            request.input('number', sql.Numeric, number);      
            await request.query("update postrecruiter set username = @name where number=@number")
            await request.query("update Recruiter set name = @name  , bio = @bio , companyname = @companyname  , email = @email where number = @number")
        }
     }catch(e)
     {
        console.log(e)
        return res.status(200).json({success: false,});
     }
     return res.status(200).json({success: true,});

 }

 module.exports.internprofile = async(req,res)=>{

   console.log("in internprofile")
    var sql = require("mssql");
    var request = new sql.Request();
    const number = req.body.number;
    request.input("number",sql.Numeric,number);
    await request.query("select * from Intern where number = @number",function(err,recordset)
    {
        if (err) console.log("error in interprofile export")
            res.send(recordset); 
    });
 }

 module.exports.getinternexperience = async(req,res)=>{

   var sql = require("mssql");
   var request = new sql.Request();
   const number = req.number;
   request.input("number",sql.Numeric,number);
   await request.query("select * from Experience where usernumber = @number",function(err,recordset)
   {
       if (err) console.log("error in ip controller")
           res.send(recordset); 
   });
}

module.exports.getinterneducation = async(req,res)=>{

   var sql = require("mssql");
   var request = new sql.Request();
   const number = req.number;
   request.input("number",sql.Numeric,number);
   await request.query("select * from Education where usernumber = @number",function(err,recordset)
   {
       if (err) console.log("error in ip controller")
           res.send(recordset); 
   });
}


module.exports.updateinternprofile = async(req,res)=>{
   var sql = require("mssql");
   var request = new sql.Request();
   console.log("in updateinternprofile")
    console.log(req.body)
    console.log(req.number)
    const name = req.body.name;
    const number = req.number;
    const age = req.body.age;
    const city = req.body.city;
    const skills = req.body.skills;
    const country = req.body.country;
    const state = req.body.state;
    const zipcode = req.body.zipcode;
    const gender = req.body.gender;
    const dob = req.body.dob;
    
    try{
   
    request.input('name', sql.VarChar, name);
    request.input('city', sql.VarChar, city);
    request.input('skills', sql.VarChar, skills);
    request.input('country', sql.VarChar, country);
    request.input('state', sql.VarChar, state);
    request.input('zipcode', sql.VarChar, zipcode);
    request.input('gender', sql.VarChar, gender);
    request.input('dob', sql.VarChar, dob);
    request.input('number', sql.Numeric, number);
    request.input('age', sql.Numeric, age);

    await request.query("delete from skills where usernumber = @number")

    const skillsarray = skills.split(',');
    const table = new sql.Table('skills');
    table.create = false; // table already exists
    table.columns.add('skill', sql.VarChar(50), { nullable: true });
    table.columns.add('usernumber', sql.Numeric(10,0), { nullable: true });

    for(let i=0;i<skillsarray.length;i++)
    {
      table.rows.add(skillsarray[i],number)
    }

    request.bulk(table, (err, result) => {
        // ... error checks
      })
    if(req.body.name)
    {
    await request.query("update comments set username = @name where usernumber=@number")
    await request.query("update postintern set username = @name where usernumber=@number")
    }
    await request.query("update Intern set name = @name , age = @age , skills = @skills , city = @city , gender = @gender , country = @country , state = @state , dob = @dob ,zipcode = @zipcode   where number = @number")
       
      
    }catch(e)
    {
      console.log(e)
      return res.status(200).json({success: false,});
    }
    return res.status(200).json({success: true,});

}

module.exports.postexperience = async(req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.body)
    console.log(req.number)
    const experience = req.body.experience;
    const number = req.number;
    request.input("number",sql.Numeric,number);
    request.input("experience",sql.VarChar,experience);
    await request.query("insert into Experience(usernumber,experience) values(@number,@experience)",function(err,recordset)
    {
        if (err) console.log(err)
        res.send(recordset); 
    });
 }

 module.exports.posteducation = async(req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request();
    const education = req.body.education;
    const number = req.number;
    request.input("number",sql.Numeric,number);
    request.input("education",sql.VarChar,education);
    await request.query("insert into Education(usernumber,education) values(@number,@education)",function(err,recordset)
    {
        if (err) console.log("error in ip controller")
        res.send(recordset); 
    });
 }

 module.exports.updateinternphoto = async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    console.log("in updateinternphoto")
    const number = req.number;
    request.input("number",sql.Numeric,number);
    
     try{
        if(req.file)
        {
     const photo = req.file.filename;
     request.input('photo', sql.VarChar,photo);   
     await request.query("update comments set profilephoto = @photo where usernumber = @number")
     await request.query("update postintern set profilephoto = @photo where usernumber = @number")
     await request.query("update Intern set  profilephoto = @photo where number = @number")
        }
        else
        {
            return res.status(200).json({success: false,});
        }

     }catch(e)
     {
        console.log(e)
        return res.status(200).json({success: false,});
     }
     return res.status(200).json({success: true,});

 }


module.exports.postbio = async(req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.body)
    console.log(req.number)
    const bio = req.body.bio;
    const number = req.number;
    request.input("number",sql.Numeric,number);
    request.input("bio",sql.VarChar,bio);
    await request.query("update Intern set bio = @bio where number = @number",function(err,recordset)
    {
        if (err) console.log(err)
        res.send(recordset); 
    });
 }

 module.exports.getprofileexperience = async(req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request();
    const number = req.params.number;
    request.input("number",sql.Numeric,number);
    await request.query("select * from Experience where usernumber = @number",function(err,recordset)
    {
        if (err) console.log("error in ip controller")
            res.send(recordset); 
    });
 }
 
 module.exports.getprofileeducation = async(req,res)=>{
 
    var sql = require("mssql");
    var request = new sql.Request();
    const number = req.params.number;
    request.input("number",sql.Numeric,number);
    await request.query("select * from Education where usernumber = @number",function(err,recordset)
    {
        if (err) console.log("error in ip controller")
            res.send(recordset); 
    });
 }

 module.exports.settingskills = async(req,res)=>{

var sql = require("mssql");


const request = new sql.Request();

// table.columns.add('skill', sql.VarChar, { nullable: false });
// table.columns.add('usernumber', sql.Int, { nullable: false });
const users = await request.query("select * from Intern")
const table = new sql.Table('skills');
table.create = false; // presuming table already exists

table.columns.add('skill', sql.VarChar(50), { nullable: true });

table.columns.add('usernumber', sql.Numeric(10,0), { nullable: true });



for(let i=0;i<users.recordset.length;i++)
{
 var skills = users.recordset[i].skills.split(',');
 var number = users.recordset[i].number;
 for(let j = 0;j<skills.length;j++)
 {
    table.rows.add(skills[j],number)
 }

}
// Add rows



request.bulk(table, (err, result) => {
  // ... error checks
})
}

module.exports.getuserskills = async(req,res)=>{
 
    var sql = require("mssql");
    var request = new sql.Request();
    const number = req.params.number;
    request.input("number",sql.Numeric,number);
    await request.query("select * from skills where usernumber = @number",function(err,recordset)
    {
        if (err) console.log("error in ip controller")
            res.send(recordset); 
    });
 }