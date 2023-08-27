
module.exports.insertintern = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    const bcrypt = require("bcrypt")
   console.log(req.body)
   const name = req.body.name;
   const number = req.body.number;
   const age = req.body.age;
   const email = req.body.email;
   const password = req.body.password;
   const skills = req.body.skills;
   const city = req.body.city;
   const moment = require('moment')
   const hashedpassword = await bcrypt.hash(password,10);
   try{
       request.input('name', sql.VarChar, name);
       request.input('city', sql.VarChar, city);
       request.input('email', sql.VarChar, email);
       request.input('password', sql.VarChar, hashedpassword);
       request.input('skills', sql.VarChar, skills);
       request.input('number', sql.Numeric, number);
       request.input('age', sql.Numeric, age);
       const date = moment(new Date()).format("YYYY-MM-DD");
       request.input('joiningdate', sql.Date,date);

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

        await request.query("insert into Intern(joiningdate,name,city,age,email,password,skills,number) values (@joiningdate,@name,@city,@age,@email,@password,@skills,@number)",
       function (err, recordset) {
           
           if (err) console.log(err)
           // send records as a response
           res.send(recordset);
       });
    }
   // });
}catch(e){
   console.log(e)

}
};


module.exports.deleteintern = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
   console.log(req.body)
   const number = req.body.number;
   request.input('number', sql.Numeric, number);
   await request.query("delete from Intern where number = @number",function(err){
    if(err)
    {
        return res.status(200).json({success: false})
    }
   })
  ;
}



module.exports.getallinterns = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    await request.query("select * from Intern",
    function (err, recordset) {  
        if (err) console.log(err)
        res.send(recordset);
    });
}


module.exports.getinternsbystring = async(req,res)=>{
    console.log("inside intern by string ")
    var sql = require("mssql");
    var request = new sql.Request();
    console.log(req.body)
    const search = req.body.search
    console.log(typeof(search))
    request.input('search', sql.NText, search);
     await request.query(`select * from Intern where name like '%' + @search + '%' `,
    function (err, recordset) {  
        if (err) console.log(err)
        res.send(recordset);
        console.log(recordset)
    });
}