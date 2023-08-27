
module.exports = async (email, subject, text) => {

    const path = require('path')
	var hbs = require('nodemailer-express-handlebars');

	

	const nodemailer = require("nodemailer");
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth:{
				user: "neeltulsiani007@gmail.com",
				pass: "krovkyocagzxzkvu"
			},
		});

		const handlebarOptions = {
			viewEngine: {
			  extName: ".handlebars",
			  partialsDir: path.resolve('./views'),
			  defaultLayout: false,
			},
			viewPath: path.resolve('./views'),
			extName: ".handlebars",
		  }

		transporter.use('compile', hbs(handlebarOptions));
		
        console.log(process.env.USER)
		console.log(email)
		await transporter.sendMail({
			from: "neeltulsiani007@gmail.com",
			to: email,
			subject: subject,
			// text: text,
			template: 'email',
			context: {
				
				text:text
			  }
		});
		console.log("email sent successfully");
		return true;
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return false;
		
	}
};



