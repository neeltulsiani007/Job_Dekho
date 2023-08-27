module.exports.sendemail = async (req,res)=>{
    var sql = require("mssql");
    var request = new sql.Request();
    const sendEmail = require("../sendEmail");
    
    const accesstoken = req.headers.accesstoken;
    console.log(accesstoken)
   console.log(req.body)
   const number = req.number;
   request.input('number', sql.Numeric, number);
   const user = await request.query("Select * from Intern  where number = @number")
   const userrecruiter = await request.query("Select * from Recruiter  where number = @number")
   var email;
   var refreshtoken
   if(user.recordset[0])
   {
     email = user.recordset[0].email
    console.log(email)
    refreshtoken = user.recordset[0].refreshtoken
    request.input('email',sql.VarChar,email);
   }
   else
   {
    email = userrecruiter.recordset[0].email
    refreshtoken = userrecruiter.recordset[0].refreshtoken
    console.log(email)
   }

   const text = "Thank you for signing up with Job Dekho ! Please click on the following link to verify your email address!"
   const url = `${process.env.BASE_URL}emailverification/${req.number}/verify/${refreshtoken}`;
   try{
		const e = await sendEmail(email, "Verify Email", url);
        if(e)
        {
		res
		.status(201)
		.send({ message: "An Email sent to your account please verify" ,success:true});
        }
        else
        {
         res
		.status(201)
		.send({ message: "Invalid Email" , success:false });
        }

   }catch(e)
   {
    console.log(error);
	res.status(500).send({ message: "Internal Server Error" });
   }
	}

    module.exports.verifyemail = async (req, res) => {
        try {      
            console.log("inside verifyemail")
            var sql = require("mssql");
            var request = new sql.Request();
            const number = req.params.number;
            const token = req.params.token;
            request.input('number', sql.Numeric, number);
            request.input('token',sql.VarChar,token);
             console.log(number)
             console.log(token)
             const user = await request.query("Select * from Intern  where number = @number and refreshtoken = @token")
             const userrecruiter = await request.query("Select * from Recruiter  where number = @number and refreshtoken = @token")

            if(user.recordset[0])
            {
            console.log("inside user")
              await request.query("update Intern set verified = 'true' where number = @number " )
              res.status(200).send({ message: "Email verified successfully" ,success:true});
            }

            else if(userrecruiter.recordset[0])
            {
                console.log("inside userrecruiter")
                await request.query("update Recruiter set verified = 'true' where number = @number " )
                res.status(200).send({ message: "Email verified successfully" ,success:true});
            }
            else
            {
               console.log("Error")
                res.status(200).send({ message: "Email verification failed" , success:false });
            }
            
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error" ,success:false });
        }
    }
    

