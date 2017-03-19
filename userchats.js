const sql = require('mssql');

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

sql.connect(config).then(() => {
    var userArray = []; //array of users with similar interests
    req = new sql.Request();

    //storing details of potentail users
    sqlStat = 'select * from userchats';
    req.query(sqlStat, function(err, recset) {

        console.log(recset);
        sql.close();
    });

}).then(result => {
    console.dir(result);
}).catch(err => {
    console.dir(err);
})