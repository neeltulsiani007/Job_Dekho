
module.exports.internpost = async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    const moment = require('moment')
    console.log(req.body)
    console.log(req.file)
    const name = req.user;
    const caption = req.body.caption
    const number = req.number;
 
    try{
        const photo = req.file.filename;
        request.input('name', sql.VarChar, name);
        request.input('number', sql.Numeric, number);
        request.input('photo', sql.VarChar,photo);
        request.input('filetype', sql.VarChar,"photo");
        request.input('caption', sql.VarChar, caption);
        const date = moment(new Date()).format("YYYY-MM-DD");
        request.input('DATE', sql.Date,date);
        const userintern = await request.query("Select * from Intern where number = @number")
        const userrecruiter = await request.query("Select * from Recruiter  where number = @number")
         
        if(userintern.recordset[0])
        {
            const pic = await request.query("select profilephoto as p from Intern where number  = @number")
            const  profile = pic.recordset[0].p;
            request.input('profile', sql.VarChar,profile);
            await request.query("insert into postintern(filetype,username,usernumber,imagedata,caption,posttype,date,profilephoto) values (@filetype,@name,@number,@photo,@caption,'Intern',@date,@profile)",
            function (err, recordset){
                if (err) console.log(err)
                res.send(recordset);
            });
        }

    }catch(e)
    {
        console.log(e); 
        return res.status(200).json({success: false,});
       
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

 module.exports.getpost = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    try{     
         await request.query("select * from postintern",
        function (err, recordset) {       
            if (err) console.log("error in post controller")
            res.send(recordset);     
        });
 }catch(e){
    console.log(e)
 }
 };

 module.exports.getpostsbyoffset = async(req,res)=>{

    console.log("inside getoffset")
    var sql = require("mssql");
    var request = new sql.Request();
    const offset = req.params.offset*4;
    const fetch = offset+4
     console.log(offset)
    request.input('offset', sql.Int, offset);
    request.input('fetch', sql.Int, fetch);
    const numberofposts = await request.query("select count(postid) as c from postintern",)
   

    console.log(numberofposts)
    const number = numberofposts.recordset[0].c
    if(fetch > number)
    {
        console.log("here")
        return res.status(200).json({hasMore:"false"})
    }
    try{     
        await request.query("select * from postintern order by date offset @offset rows fetch next 4 rows only",
       function (err, recordset) {       
           if (err) console.log("error in post controller")
         //  if(Object.keys(recordset).length <4)
          // {
            // console.log(recordset)
     
            res.send(recordset);  
         //  }
        //    console.log( Object.keys(recordset).length)
         //  res.send(recordset);  
      

 
       });

}catch(e){
   console.log(e)
}

 }

 module.exports.postlikes = async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
        const  postid  = req.body.postid;
        const number = req.body.number;
        console.log("here")
        console.log(number);
        request.input('number', sql.Numeric, number);
        
        request.input('postid', sql.Numeric, postid);

         const found = await request.query("select * from likes where usernumber = @number and postid = @postid")
          console.log(found)
        if (!found.recordset[0]) {
          await request.query("insert into likes(postid,usernumber) values(@postid,@number)");
          res.json({ liked: true });
        } else {
          await request.query("delete from likes where usernumber = @number and postid = @postid");
          res.json({ liked: false });
        }
        const likesnumber = await request.query("select count(usernumber) as c from likes where postid = @postid")
        console.log(likesnumber.recordset[0].c)
        request.input('countlikes', sql.Numeric, likesnumber.recordset[0].c);
        await request.query("update postintern set countlikes = @countlikes where postid = @postid");

 };

 module.exports.updatelikes = async (req,res)=>{
    console.log("here")
    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.number)
     const number = req.number;
     request.input('number',sql.Numeric,number);
    try{     
        await request.query("select postid from likes where usernumber = @number",
        function (err, recordset) {       
            if (err) console.log("error in users controller")
            res.send(recordset);     
        });

 }catch(e){
    console.log(e)
 }
 };

 module.exports.individualpost = async(req,res)=>{


    var sql = require("mssql");
    var request = new sql.Request();
    const id = req.params.id;
    
    request.input("postid",sql.Numeric,id);
    await request.query("select * from postintern where postid = @postid",function(err,recordset)
    {
        if (err) console.log("error in users controller")
            res.send(recordset); 
    });
    
 }

 module.exports.getcomments = async(req,res)=>{
   
    var sql = require("mssql");
    var request = new sql.Request();
    const id = req.params.id;
    request.input("postid",sql.Numeric,id);
    await request.query("select * from comments where postid = @postid",function(err,recordset)
    {
        if (err) console.log("error in users controller")
            res.send(recordset); 
    });
 }

 module.exports.addcomments = async(req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request();
    const moment = require('moment')
    console.log("inside addcomments")
    const id = req.params.id;
    const comment = req.body.comment;
    const date = moment(new Date()).format("YYYY-MM-DD");
    console.log(req.user)
    console.log(req.number)
    
    const name = req.user;
    const number = req.number;
    request.input("number",sql.Numeric,number);
    const user = await request.query("select * from Intern where number  = @number");
    const userrecruiter = await request.query("select * from Recruiter where number  = @number");
    request.input("postid",sql.Numeric,id);

    request.input("name",sql.VarChar,name);
    request.input("date",sql.Date,date);
    request.input("comment",sql.VarChar,comment);
    console.log(id,comment,number,date,name)
    const comm = await request.query("select count(comment) as c from comments where postid = @postid")
    const comments = comm.recordset[0].c;
    console.log(comments)
    request.input("comments",sql.Numeric,comments+1);
    var pic;
    await request.query("update postintern set countcomments = @comments where postid=@postid")
    if(user.recordset[0]){
     pic = await request.query("select profilephoto as p from Intern where number  = @number")
    }
    else 
    {
        pic = await request.query("select profilephoto as p from Recruiter where number  = @number")
    }
    if(pic.recordset[0].p){
    const  profile = pic.recordset[0].p;
    request.input('profile', sql.VarChar,profile);
    await request.query("insert into comments(comment,postid,usernumber,username,commentdate,profilephoto) values(@comment,@postid,@number,@name,@date,@profile)",function(err,recordset)
    {
        if (err) console.log("error in addcomments controller")
            res.send(recordset); 
    });
}
else
{
    await request.query("insert into comments(comment,postid,usernumber,username,commentdate) values(@comment,@postid,@number,@name,@date)",function(err,recordset)
    {
        if (err) console.log("error in addcomments controller")
            res.send(recordset); 
    });
}
 }

 module.exports.recruiterpost = async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    const moment = require('moment')
    console.log(req.body)
 
    const name = req.body.name;
    const number = req.number;
    const mode = req.body.mode;
    const stipend = req.body.stipend;
    const username = req.user;
    const date = req.body.lastdate;
    datecheck = new Date(date)
    const lastdate = (new Date(datecheck.getTime() + (24 * 60 * 60 * 1000)))
    const postdate = moment(new Date()).format("YYYY-MM-DD");
    const postid = req.body.uid;
    var skills = req.body.skills;
    const info = req.body.info
    request.input("number",sql.Numeric,number);
    request.input("postid",sql.VarChar,postid);
    request.input("username",sql.VarChar,username);
    request.input("name",sql.VarChar,name);
    request.input("info",sql.VarChar,info);
    request.input("mode",sql.VarChar,mode);
    request.input("stipend",sql.Numeric,stipend);
    request.input("lastdate",sql.Date,lastdate);
    request.input("postdate",sql.Date,postdate);
    request.input("skills",sql.VarChar,skills);
    const photo = await request.query("select profilephoto as p from Recruiter where number = @number")
    const profilephoto = photo.recordset[0].p
    request.input("profilephoto",sql.VarChar,profilephoto);
    var min = Math.ceil(0);
    var max = Math.floor(6);
    var image = Math.floor(Math.random() * (max - min + 1) + min);
    request.input("imageid",sql.Numeric,image);
   const array  = skills.split(",")
   console.log(array)  

    try{
    if(req.mode === 'Online')
    {
        console.log("in online")
        if(req.body.info != ""){
            console.log("here")
        await request.query("insert into postrecruiter(profilephoto,imagenumber,postid,username,postdate,number,cname,info,mode,stipend,lastdatetoapply,skills) values(@profilephoto,@imageid,'${postid}',@username,@postdate,@number,@name,@info,@mode,@stipend,@lastdate,@skills)")
        }
        else
        {
        await request.query("insert into postrecruiter(profilephoto,imagenumber,postid,username,postdate,number,cname,mode,stipend,lastdatetoapply,skills) values(@profilephoto,@imageid,'${postid}',@username,@postdate,@number,@name,@mode,@stipend,@lastdate,@skills)")
        }
    }

    else
    {
       
       const address = req.body.address;
       const city = req.body.city;
       const country = req.body.country;
       const state = req.body.state;
       const zipcode = req.body.zipcode;
    
       request.input("address",sql.VarChar,address);
       request.input("city",sql.VarChar,city);
       request.input("country",sql.VarChar,country);
       request.input("state",sql.VarChar,state);
       request.input("zipcode",sql.VarChar,zipcode);
 
       if(req.body.info)
       {
        await request.query("insert into postrecruiter(profilephoto,imagenumber,postid,username,postdate,number,cname,info,mode,stipend,lastdatetoapply,skills,address,city,state,zipcode,country) values(@profilephoto,@imageid,@postid,@username,@postdate,@number,@name,@info,@mode,@stipend,@lastdate,@skills,@address,@city,@state,@zipcode,@country)")
       }
       else
       {
        await request.query("insert into postrecruiter(profilephoto,imagenumber,postid,username,postdate,number,cname,mode,stipend,lastdatetoapply,skills,address,city,state,zipcode,country) values(@profilephoto,@imageid,@postid,@username,@postdate,@number,@name,@mode,@stipend,@lastdate,@skills,@address,@city,@state,@zipcode,@country)")
       }
    }
    }catch(e)
    {
        console.log(e)
    }
    }

module.exports.getrecruiterpost = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    try{     
         await request.query("select * from postrecruiter",
        function (err, recordset) {       
            if (err) console.log("error in post controller")
            res.send(recordset);     
        });

 }catch(e){
    console.log(e)
 }
 };

 module.exports.postapplicants = async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
        const  postid  = req.body.postid;
        const number = req.number;
        console.log(number);
        request.input('number', sql.Numeric, number);
        request.input('postid', sql.VarChar, postid);
         
         const rnumber = await request.query("select number as n from postrecruiter where postid = @postid")
          const recruiternumber = rnumber.recordset[0].n;
          request.input('recruiternumber', sql.Numeric, recruiternumber);
         const found = await request.query("select * from applicants where usernumber = @number and postid = @postid")
          console.log(found)
        if (!found.recordset[0]) {
          await request.query("insert into applicants(recruiternumber,postid,usernumber) values(@recruiternumber,@postid,@number)");
          res.json({ liked: true });
        }else{
          await request.query("delete from applicants where usernumber = @number and postid = @postid");
          res.json({ liked: false });
        }
        const numberofapplicants = await request.query("select count(usernumber) as c from applicants where postid = @postid")
        request.input('numberofapplicants', sql.Numeric, numberofapplicants.recordset[0].c);
        await request.query("update postrecruiter set numberofapplicants = @numberofapplicants where postid = @postid");

 };


 module.exports.updateapplicants = async (req,res)=>{
    console.log("here")
    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.number)
     const number = req.number;
     request.input('number',sql.Numeric,number);
    try{     
        await request.query("select postid from applicants where usernumber = @number",
        function (err, recordset){       
            if (err) console.log("error in users controller")
            res.send(recordset);     
        });

 }catch(e){
    console.log(e)
 }
 };


 module.exports.getapplicants = async (req,res)=>{
    console.log("here")
    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.number)
     const number = req.number;
     request.input('number',sql.Numeric,number);
    try{     
      await request.query("select distinct(usernumber) from applicants where recruiternumber = @number",
      function (err, recordset){       
          if (err) {console.log("error in users controller")   
          console.log(err) 
      }
      res.send(recordset);
      });

 }catch(e){
    console.log(e)
 }
 };


module.exports.internvideo = async(req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    const moment = require('moment')
    console.log(req.body)
    console.log(req.file)
    const name = req.user;
    const caption = req.body.caption
    const number = req.number;
 
    try{
        const video = req.file.filename;
        request.input('name', sql.VarChar, name);
        request.input('number', sql.Numeric, number);
        request.input('video', sql.VarChar,video);
        request.input('filetype', sql.VarChar,"video");
        request.input('caption', sql.VarChar, caption);
        const date = moment(new Date()).format("YYYY-MM-DD");
        request.input('DATE', sql.Date,date);
        const userintern = await request.query("Select * from Intern where number = @number")
        const userrecruiter = await request.query("Select * from Recruiter  where number = @number")
         
        if(userintern.recordset[0])
        {
            const pic = await request.query("select profilephoto as p from Intern where number  = @number")
            const  profile = pic.recordset[0].p;
            request.input('profile', sql.VarChar,profile);
            await request.query("insert into postintern(filetype,username,usernumber,imagedata,caption,posttype,date,profilephoto) values (@filetype,@name,@number,@video,@caption,'Intern',@date,@profile)",
            function (err, recordset){
                
                if (err) console.log(err)
                res.send(recordset);
            });
        }

    }catch(e)
    {
        console.log(e); 
        return res.status(200).json({success: false,});
       
    }
}

