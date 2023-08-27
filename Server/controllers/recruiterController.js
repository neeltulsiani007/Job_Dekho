module.exports.insertrecruiter = async (req,res)=>{
    console.log(req.body)
   const name = req.body.name;
   const number = req.body.number;
   const email = req.body.email;
   const password = req.body.password;
   try{
       var sql = require("mssql");
       const bcrypt = require("bcrypt");
       var request = new sql.Request();
       const hashedpassword = await bcrypt.hash(password,10);
       request.input('name', sql.VarChar, name);
       request.input('email', sql.VarChar, email);
       request.input('password', sql.VarChar, hashedpassword);
       request.input('number', sql.Numeric, number);
       const usernumber = await request.query("Select * from Intern where number = @number")
       const usernumberrecruiter = await request.query("Select * from Recruiter  where number = @number")
       const useremail = await request.query("Select * from Intern where email = @email")
       const userrecruiteremail = await request.query("Select * from Recruiter  where email = @email")
         
        if(usernumber.recordset[0])
        {
            return res.status(200).json({success: false})
        }
        else if(useremail.recordset[0]){
            return res.status(200).json({success: false})
        }
        else if(userrecruiteremail.recordset[0]){
            return res.status(200).json({success: false})
        }
        else if(usernumberrecruiter.recordset[0]){
            return res.status(200).json({success: false})
        }
        else
        {
        await request.query("insert into Recruiter(name,email,password,number) values (@name,@email,@password,@number)",
       function (err, recordset) {
           
           if (err) console.log(err)

           // send records as a response
           res.send(recordset);
           
       });
   // });
    }
}catch(e){
   console.log(e)
}
};


module.exports.deleterecruiter = async (req,res)=>{
   var sql = require("mssql");
   var request = new sql.Request();
   console.log(req.body)
   const number = req.body.number;
   request.input('number', sql.Numeric, number);
   await request.query("delete from Recruiter where number = @number",function(err){
    if(err)
    {
        return res.status(200).json({success: false})
    }
   })
  ;
}


module.exports.getrecruiterbynumber = async(req,res)=>{

    console.log("in grbn")
    var sql = require("mssql");
    var request = new sql.Request();
    try{
    const number = req.params.number;
    request.input("number",sql.Numeric,number);

 const applicants = await request.query("select count(distinct (usernumber)) as c from applicants where recruiternumber = @number");
  const num = applicants.recordset[0].c
  console.log(num)

  request.input("applicants",sql.Int,num);

  await request.query("update Recruiter set applicants = @applicants where number = @number")

    await request.query("select * from Recruiter where number = @number",
    function (err, recordset) {
        if (err) console.log(err)
        res.send(recordset);   
    });
}catch(e){console.log(e)}

}