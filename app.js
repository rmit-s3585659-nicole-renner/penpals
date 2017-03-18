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
    tableName: 'testtable',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

function login(user, pass){
    sql.connect(config).then(() => {
        console.dir("Trying to login");
        return sql.query () ;
    }).then(result => {
        console.dir(result);
    }).catch(err => {
        console.dir(err);
    })
}

function signup(str_user, str_pass, str_email, int_agegroup, str_country, str_lang, str_otherlang, arr_interest, arr_expertise, str_aboutme){
    sql.connect(config).then(() => {
        console.dir("Trying to login");
        return sql.query () ;
    }).then(result => {
        console.dir(result);
    }).catch(err => {
        console.dir(err);
    })
}
