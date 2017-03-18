var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    const opn = require('opn')
    opn('index.html')
    res.end('Hello World. I"m alive!!!!!\n');
}).listen(port);

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/testDB', function(request, response) {
    callThisToTest();
    console.log('Hurray you called this method');
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end();
});

app.listen(8000, function() {
    const opn = require('opn')
    opn('index.html')
});

////////////////////////////////////////////////////// SQL SECTION AHEAD

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

function callThisToTest() {
    var username = "\'user\'";
    var email = "\'email\'";
    var country = "\'country\'";
    var agegroup = 1;
    var preferredlanguage = "\'language\'";
    var aboutme = "\'aboutme\'";
    //var profilepic = "\'null\'";
    sql.connect(config).then(() => {
        var request = new sql.Request();
        var sqlStatement = 'insert into regUser (regUserName,email,country,agegroup,preferredlanguage,aboutme) values (' + username + ',' + email + ',' + country + ',' + agegroup + ',' + preferredlanguage + ',' + aboutme + ')';
        console.log(sqlStatement)
        request.query(sqlStatement, function(err, recordset) {
            console.log(err);
            console.log(recordset);
        });
        return;
    }).then(result => {
        console.dir(result);
    }).catch(err => {
        console.dir(err);
    })
}

// function login(user, pass) {
//     sql.connect(config).then(() => {
//         console.dir("Trying to login");
//         var request = new sql.Request();
//         request.query("select * from credentials where username=" + user + " password=" + pass, function(err, recordset) {
//             console.log(recordset[0].number);
//         });
//         return;
//     }).then(result => {
//         console.dir(result);
//     }).catch(err => {
//         console.dir(err);
//     })
// }

// function signup(str_user, str_pass, str_email, int_agegroup, str_country, str_lang, arr_otherlang~, arr_interest, arr_expertise, str_aboutme) {
//     sql.connect(config).then(() => {
//         console.dir("Trying to login");
//         var request1 = new sql.Request();
//         request.query('insert into credentials (username,password), values (' + str_user + ',' + str_pass + ')', function(err, recordset1) {
//             if (recordset1[0] > 0) { //if insertion is successful
//                 var request2 = new sql.Request();
//                 request2.query('insert into credentials (username,email,country,ageGroup,preferredLanguage,aboutMe,PROFILEPIC,STATUS), values (' + str_user + ',' + str_email + ',' + str_country + ',' + int_agegroup + ',' + str_lang + ',' + str_aboutme + ',' + PROFILEPIC~+',' + STATUS~+')', function(err, recordset2) {
//                     if (recordset2[0] > 0) { //if insertion is successful
//                         for (i = 0; i < arr_interest.length; i++) {
//                             var request3 = new sql.Request();
//                             request3.query('insert into credentials (username,interest), values (' + str_user + ',' + arr_interest[i] + ')', function(err, recordset3) {
//                                 if (recordset3[0] > 0) { //if insertion is successful

//                                 }
//                             });
//                         }
//                         for (i = 0; i < arr_expertise.length; i++) {
//                             var request4 = new sql.Request();
//                             request4.query('insert into credentials (username,experience), values (' + str_user + ',' + arr_expertise[i] + ')', function(err, recordset4) {
//                                 if (recordset4[0] > 0) { //if insertion is successful

//                                 }
//                             });
//                         }
//                     }
//                 });
//             }
//         });
//         return;
//     }).then(result => {
//         console.dir(result);
//     }).catch(err => {
//         console.dir(err);
//     })
// }