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

    // sqlStat = 'select distinct regUserName from user';
    // req.query(sqlStat, function(err, recset) {
    //     console.log(recset.length);
    //     for (count = 1; count < recset.length; count++) {
    //         console.log("test");
    //     }
    //     sql.close();
    // });

    tuser = 'user1';
    var tuserinterests = []; //interests of the main user
    var conuserinterest = []; //connected user interests
    matchScore = 0;
    userCount = 0;
    mapCount = 0;
    var matchesmap = new Map();
    // var listinterests = new ArrayList();

    //retrieveving existing users except the main user
    sqlStat = "select regusername from reguser where regusername not like '%user1%'";
    req.query(sqlStat, function(err, recset) {
        // for (count = 0; count < recset.length - 1; count++) {
        //     console.log(recset[count].regusername);
        // }
        sql.close();
    });

    // retrieveving interests of main user
    sqlStat = 'select ui.interest from regUser ru inner join userInterest ui on ru.regUserName=ui.regUserName';
    req.query(sqlStat, function(err, recset) {
        for (count = 1; count < recset.length; count++) {
            tuserinterests[count] = recset[count].interest;
        }
        // for (count = 1; count < tuserinterests.length; count++) {
        //     console.log(tuserinterests[count]);
        // }
        sql.close();
    });

    //retrieveving interests of all potential users
    sqlStat = "select ui.regUserName,ui.interest from regUser ru inner join userInterest ui on ru.regUserName=ui.regUserName where ui.regUserName not like'%user1%'";
    req.query(sqlStat, function(err, recset) {
        for (count = 1; count < recset.length; count++) {
            conuserinterest[count] = recset[count].interest;
        }
        // for (count = 1; count < recset.length; count++) {
        //     console.log(conuserinterest[count]);
        // }
        sql.close();
    });

    //storing details of potentail users
    sqlStat = 'select count(ui.regUserName) as regUserCount from regUser ru inner join userInterest ui on ru.regUserName=ui.regUserName';
    req.query(sqlStat, function(err, recset) {
        for (count = 1; count < recset.length; count++) {
            userCount = recset[count].regUserCount;
        }
        console.log(userCount);
        sql.close();
    });

    //checking compatibility with other users
    for (count = 1; count <= 3; count++) {
        for (count1 = 1; count1 <= conuserinterest.length; count1++) {
            if (tuserinterests[count] == conuserinterest[count1]) {
                listinterests.add(conuserinterest[count1].regUserName);
                listinterests.add(conuserinterest[count].interest);
                matchScore++;
            }
        }
        matchesmap.set[count, matchScore];
        matchScore = 0;
    }
    console.log(matchScore);

}).then(result => {
    console.dir(result);
}).catch(err => {
    console.dir(err);
})