module.exports.handleLogout =  async(req,res) =>{
    var sql = require("mssql");
    var request = new sql.Request();

    const cookies = req.cookies
    try{
      if(!cookies?.jwt)
      {
        return res.sendStatus(204);
      }
     
       const refreshToken = cookies.jwt;
       request.input('refreshtoken', sql.VarChar, refreshToken);
       const user = await request.query("Select * from Intern  where refreshtoken = @refreshtoken")
       const userrecruiter = await request.query("Select * from Recruiter  where refreshtoken = @refreshtoken")
        // console.log(user.recordset[0])
    //    console.log(userrecruiter.recordset[0])
       if(!user.recordset[0] && !userrecruiter.recordset[0])
       {
        res.clearCookie('jwt',{httpOnly:true, sameSite:'None',secure:true})
        res.sendStatus(204)
       }
        console.log("first")
       if(user.recordset[0])
       {
        console.log("here")
        await request.query("update Intern set refreshtoken = ' '  where refreshtoken = @refreshtoken")
       }
       else
       {
        await request.query("update Recruiter set refreshtoken = ' '  where refreshtoken = @refreshtoken")
       }
           
       res.clearCookie('jwt',{httpOnly:true, sameSite:'None',secure:true})
        res.sendStatus(204)
 
    }catch(e){
      return res.status(500).json({e})
    }
  }