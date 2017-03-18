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

app.post('/signup', function(request, response) {
    // console.log(request.body);
    var username = "'" + request.body.user.username + "'";
    var password = "'" + request.body.user.password + "'";

    var email = "'" + request.body.user.email + "'";
    var agegroup = request.body.user.age;
    var country = "'" + request.body.company.country_id + "'";
    var prefLanguage = "'" + request.body.user.language + "'";
    var otherLanguage = "'" + request.body.user.otherlang + "'";
    var aboutme = "'" + request.body.user.aboutme + "'";

    var booksInterest = request.body.interest.books != undefined;
    var careerInterest = request.body.interest.career != undefined;
    var educationInterest = request.body.interest.education != undefined;
    var foodInterest = request.body.interest.food != undefined;
    var sportsInterest = request.body.interest.sports != undefined;
    var travelInterest = request.body.interest.travel != undefined;
    // var booksExpertise = request.body.expertise.book != undefined;
    // var careerExpertise = request.body.expertise.career != undefined;
    // var educationExpertise = request.body.expertise.education != undefined;
    // var foodExpertise = request.body.expertise.food != undefined;
    // var sportsExpertise = request.body.expertise.sports != undefined;
    // var travelExpertise = request.body.expertise.travel != undefined;

    console.log(request.body.expertise);

    // sql.connect(config).then(() => {
    //     console.dir("Trying to login");
    //     var request1 = new sql.Request();
    //     var sqlStatement1 = 'insert into regUser (regUserName,email,country,agegroup,preferredlanguage,aboutme) values (' + username + ',' + email + ',' + country + ',' + agegroup + ',' + prefLanguage + ',' + aboutme + ')';
    //     request1.query(sqlStatement1, function(err, recordset1) {
    //         if (recordset1[0] > 0) { //if insertion is successful
    //             var request2 = new sql.Request();
    //             var sqlStatement2 = 'insert into credentials (regUserName,password) values (' + username + ',' + password + ')';
    //             request2.query(sqlStatement2, function(err, recordset2) {
    //                 if (recordset2[0] > 0) { //if insertion is successful
    //                     for (i = 0; i < arr_interest.length; i++) {
    //                         var request3 = new sql.Request();
    //                         request3.query('insert into credentials (username,interest), values (' + str_user + ',' + arr_interest[i] + ')', function(err, recordset3) {
    //                             if (recordset3[0] > 0) { //if insertion is successful

    //                             }
    //                         });
    //                     }
    //                     for (i = 0; i < arr_expertise.length; i++) {
    //                         var request4 = new sql.Request();
    //                         request4.query('insert into credentials (username,experience), values (' + str_user + ',' + arr_expertise[i] + ')', function(err, recordset4) {
    //                             if (recordset4[0] > 0) { //if insertion is successful

    //                             }
    //                         });
    //                     }
    //                 }
    //             });
    //         }
    //     });
    //     return;
    // }).then(result => {
    //     console.dir(result);
    // }).catch(err => {
    //     console.dir(err);
    // })
});



// function login(user, pass) {
app.post('/login', function(request, response) {
    var user = request.body.user;
    var pass = request.body.password;
    sql.connect(config).then(() => {
        console.dir("Trying to login");
        var request = new sql.Request();
        request.query("select * from credentials where username=" + user + " password=" + pass, function(err, recordset) {
            console.log(recordset[0].number);
        });
        return;
    }).then(result => {
        console.dir(result);
    }).catch(err => {
        console.dir(err);
    })
});

app.listen(8080, function() {
    console.log("POST server running at http://127.0.0.1:8080/");
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