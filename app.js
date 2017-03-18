const sql = require('mssql');

// var db_login = "dbadmin";
// var db_pass = "admin#ZIGMA145#";
// var db_address = "codebrew2017penpal.database.windows.net";
// var db_dbName = "dbpenpal";

const config = {
    user: 'dbadmin',
    password: 'admin#ZIGMA145#',
    server: 'codebrew2017penpal.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'dbpenpal',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
var tableName = "testtable";

sql.connect(config).then(() => {
    console.dir("I'm connected to DB now");
    return sql.query `select * from ` + tableName;
}).then(result => {
    console.dir(result);
}).catch(err => {
    console.dir(err);
})