var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
    // res.writeHead(302, {
    //     'Location': 'index.html'
    // });
    var opn = require('opn');
    opn('index.html');
    // res.end();
}).listen(port);

var bodyParser = require('body-parser');
var session = require('express-session');
var express = require('express');
var app = express();

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "sdkjgbnsjagbsjklag", resave: false, saveUninitialized: true }));

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

    var booksInterest = "";
    var careerInterest = "";
    var educationInterest = "";
    var foodInterest = "";
    var sportsInterest = "";
    var travelInterest = "";
    var booksExpertise = "";
    var careerExpertise = "";
    var educationExpertise = "";
    var foodExpertise = "";
    var sportsExpertise = "";
    var travelExpertise = "";

    if (request.body.interest != undefined) {
        booksInterest = "'" + request.body.interest.books + "'";
        careerInterest = "'" + request.body.interest.career + "'";
        educationInterest = "'" + request.body.interest.education + "'";
        foodInterest = "'" + request.body.interest.food + "'";
        sportsInterest = "'" + request.body.interest.sports + "'";
        travelInterest = "'" + request.body.interest.travel + "'";
    }
    if (request.body.expertise != undefined) {
        booksExpertise = "'" + request.body.expertise.book + "'";
        careerExpertise = "'" + request.body.expertise.career + "'";
        educationExpertise = "'" + request.body.expertise.education + "'";
        foodExpertise = "'" + request.body.expertise.food + "'";
        sportsExpertise = "'" + request.body.expertise.sports + "'";
        travelExpertise = "'" + request.body.expertise.travel + "'";
    }

    sql.connect(config).then(() => {

        //insert to regUser table
        var request1 = new sql.Request();
        var sqlStatement1 = 'insert into regUser (regUserName,email,country,groupid,preferredlanguage,aboutme) values (' + username + ',' + email + ',' + country + ',' + agegroup + ',' + prefLanguage + ',' + aboutme + ')';
        request1.query(sqlStatement1, function(err, recordset1) {
            console.log(err);
            console.log(recordset1);
        });

        //insert to credentials table
        var request2 = new sql.Request();
        var sqlStatement2 = 'insert into credentials (regUserName,password) values (' + username + ',' + password + ')';
        request2.query(sqlStatement2, function(err, recordset2) {
            console.log(err);
            console.log(recordset2);
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

        // go to dashboard

        return;
    }).then(result => {
        console.dir(result);
    }).catch(err => {
        console.dir(err);
    })
    sql.close();
});

function insertLang(username, language) {
    if (language != undefined) {
        req = new sql.Request();
        sqlStat = 'insert into userLanguage (regUserName,language) values (' + username + ',' + language + ')';
        req.query(sqlStat, function(err, recset) {
            console.log(err);
            console.log(recset);
        });
    }
}

function insertInt(username, interest) {
    if (interest != undefined) {
        req = new sql.Request();
        sqlStat = 'insert into userInterest (regUserName,interest) values (' + username + ',' + interest + ')';
        req.query(sqlStat, function(err, recset) {
            console.log(err);
            console.log(recset);
        });
    }
}

function insertExp(username, experience) {
    if (experience != undefined) {
        req = new sql.Request();
        sqlStat = 'insert into userExperience (regUserName,experience) values (' + username + ',' + experience + ')';
        req.query(sqlStat, function(err, recset) {
            console.log(err);
            console.log(recset);
        });
    }
}

// app.get('/dashboard', function(request, response) {
//     console.log(request.session);
//     if (!request.session.user) {
//         return response.status(403).send();
//     } else {
//         return response.status(200).send("Welcome");
//     }
// });

app.post('/login', function(request, response) {
    var user = "'" + request.body.user + "'";
    var pass = "'" + request.body.password + "'";

    sql.connect(config).then(() => {
        console.dir("Trying to login");
        var req = new sql.Request();
        sqlStat = "select * from credentials where regUserName=" + user + " and password=" + pass;
        req.query(sqlStat, function(err, recset) {
            var loginSuccess = recset.rowsAffected[0] === 1;
            sql.close();
            if (loginSuccess) {
                console.log("LOGIN SUCCESS!");
                request.session.user = user;
                // response.redirect('localhost/loginTest.html');
                const opn = require('opn')
                opn('loginTest.html')
            } else {
                console.log("LOGIN FAILED!");
                return response.status(204).send("Login failed");
            }
        });
    }).then(result => {
        console.dir(result);
    }).catch(err => {
        console.dir(err);
    })
});


app.post('/addConnection', function(request, response) {
    var user1 = request.body;
    var user2 = request.body;

    sql.connect(config).then(() => {
        req = new sql.Request();
        sqlStat = 'insert into userConnection (primaryRegUser,connection) values (' + user1 + ',' + user2 + ')';
        req.query(sqlStat, function(err, recset) {
            var addSuccess = recset.rowsAffected[0] === 1;
            if (addSuccess) {
                console.log("Connection added succesfully");
            } else {
                console.log("Failed to add connection");
            }
            response.writeHead(204, "");
            response.end();
            sql.close();
        });
    }).then(result => {
        console.dir(result);
    }).catch(err => {
        console.dir(err);
    })
});


app.post('/postMessage', function(request, response) {
    var user1 = "'" + request.body + "'";
    var user2 = "'" + request.body + "'";
    var message = "'" + request.body + "'";
    var dateObj = new Date();
    var currentDate = dateObj.getDate();
    var currentMonth = dateObj.getMonth() + 1;
    var currentYear = dateObj.getFullYear();
    var currentHour = dateObj.getHours();
    var currentMinute = dateObj.getMinutes();
    var currentSecond = dateObj.getSeconds();
    var dateString = "'" + currentYear + "-" + currentMonth + "-" + currentDate + " " + currentHour + ":" + currentMinute + ":" + currentSecond + "'";

    sql.connect(config).then(() => {
        req = new sql.Request();
        sqlStat = 'insert into userChats (sender,receiver,message,messageTime) values (' + user1 + ',' + user2 + ',' + message + ',' + dateString + ')';
        req.query(sqlStat, function(err, recset) {
            var addSuccess = recset.rowsAffected[0] === 1;
            if (addSuccess) {
                console.log("Chat message added succesfully");
                // Go to dashboard
            } else {
                console.log("Failed to add chat message");
            }
            response.writeHead(200, "");
            response.end();
            sql.close();
        });
    }).then(result => {
        console.dir(result);
    }).catch(err => {
        console.dir(err);
    })
});

app.listen(8080, function() {
    console.log("POST server running at http://localhost:8080/");
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