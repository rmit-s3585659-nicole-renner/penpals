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

    var agegroup = request.body.user.age;
    var email = "'" + request.body.user.email + "'";
    var country = "'" + request.body.company.country_id + "'";
    var prefLanguage = "'" + request.body.user.language + "'";
    var otherLanguage = "'" + request.body.user.otherlang + "'";
    var aboutme = "'" + request.body.user.aboutme + "'";

    var booksInterest = "'" + request.body.interest.books + "'";
    var careerInterest = "'" + request.body.interest.career + "'";
    var educationInterest = "'" + request.body.interest.education + "'";
    var foodInterest = "'" + request.body.interest.food + "'";
    var sportsInterest = "'" + request.body.interest.sports + "'";
    var travelInterest = "'" + request.body.interest.travel + "'";
    var booksExpertise = "'" + request.body.expertise.book + "'";
    var careerExpertise = "'" + request.body.expertise.career + "'";
    var educationExpertise = "'" + request.body.expertise.education + "'";
    var foodExpertise = "'" + request.body.expertise.food + "'";
    var sportsExpertise = "'" + request.body.expertise.sports + "'";
    var travelExpertise = "'" + request.body.expertise.travel + "'";

    console.log(request.body.expertise);

    sql.connect(config).then(() => {

        //insert to regUser table
        var request1 = new sql.Request();
        var sqlStatement1 = 'insert into regUser (regUserName,email,country,agegroup,preferredlanguage,aboutme) values (' + username + ',' + email + ',' + country + ',' + agegroup + ',' + prefLanguage + ',' + aboutme + ')';
        request1.query(sqlStatement1, function(err, recordset1) {
            if (recordset1[0] > 0) { //if insertion is successful to user table
            }
        });

        //insert to credentials table
        var request2 = new sql.Request();
        var sqlStatement2 = 'insert into credentials (regUserName,password) values (' + username + ',' + password + ')';
        request2.query(sqlStatement2, function(err, recordset2) {
            if (recordset2[0] > 0) { //if insertion is successful to credential table

            }
        });

        insertLang(username, otherLanguage);

        insertInt(username, booksInterest);
        insertInt(username, careerInterest);
        insertInt(username, educationInterest);
        insertInt(username, foodInterest);
        insertInt(username, sportsInterest);
        insertInt(username, travelInterest);

        insertExp(username, booksExpertise);
        insertExp(username, careerExpertise);
        insertExp(username, educationExpertise);
        insertExp(username, foodExpertise);
        insertExp(username, sportsExpertise);
        insertExp(username, travelExpertise);
        return;
    }).then(result => {
        console.dir(result);
    }).catch(err => {
        console.dir(err);
    })
});

function insertLang(username, language) {
    if (language != undefined) {
        req = new sql.Request();
        sqlStat = 'insert into userLanguage (regUserName,language) values (' + username + ',' + language + ')';
        req.query(sqlStat, function(err, recset) {
            if (recset[0] > 0) { //if insertion is successful to credential table
                console.log();
            }
        });
    }
}

function insertInt(username, interest) {
    if (interest != undefined) {
        req = new sql.Request();
        sqlStat = 'insert into userInterest (regUserName,interest) values (' + username + ',' + interest + ')';
        req.query(sqlStat, function(err, recset) {
            if (recset[0] > 0) { //if insertion is successful to credential table
                console.log();
            }
        });
    }
}

function insertExp(username, experience) {
    if (experience != undefined) {
        req = new sql.Request();
        sqlStat = 'insert into userExperience (regUserName,experience) values (' + username + ',' + experience + ')';
        req.query(sqlStat, function(err, recset) {
            if (recset[0] > 0) { //if insertion is successful to credential table
                console.log();
            }
        });
    }
}


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