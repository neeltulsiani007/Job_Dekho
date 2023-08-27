
var sql = require("mssql");

const config ={
    user: 'SA',
    password: 'Password123',
    database: 'TutorialDB',
    server: 'localhost',
    options:{
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
    },
}

// // const config = {
// //     server: process.env.INSTANCE_HOST, // e.g. '127.0.0.1'
// //     port: 1433 ,// e.g. 1433
// //     user: process.env.DB_USER, // e.g. 'my-db-user'
// //     password: process.env.DB_PASS, // e.g. 'my-db-password'
// //     database: process.env.DB_NAME, // e.g. 'my-database'
// //     options: {
// //         encrypt: false,
// //       trustServerCertificate: true,
// //     },
// //     // ... Specify additional properties here.
   
// //   };

const connect = ()=>{
sql.connect(config,  function (err) {
    
    if (err) {console.log(err)};
    console.log('DB connected');
})
}
module.exports = connect;


// const mssql = require('mssql');

// // createTcpPool initializes a TCP connection pool for a Cloud SQL
// // instance of SQL Server.
// const createTcpPool = async config => {
//   // Note: Saving credentials in environment variables is convenient, but not
//   // secure - consider a more secure solution such as
//   // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
//   // keep secrets safe.
//   const dbConfig = {
//     server: process.env.INSTANCE_HOST, 
//     port: parseInt(process.env.DB_PORT), // e.g. 1433
//     user: process.env.DB_USER, // e.g. 'my-db-user'
//     password: process.env.DB_PASS, // e.g. 'my-db-password'
//     database: process.env.DB_NAME, // e.g. 'my-database'
//     options: {
//         encrypt:false,
//       trustServerCertificate: true,
//     },
//     // ... Specify additional properties here.
//     ...config,
//   };
//   // Establish a connection to the database.
//   return mssql.connect(dbConfig);
// };

// module.exports = createTcpPool