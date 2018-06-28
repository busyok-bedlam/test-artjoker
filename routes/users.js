const { Router } = require('express');
const path = require('path');
const csv = require('csvtojson');
const router = Router();
const UserModel = require('../models/user-model');
const fs = require('fs');


const pathToCsv = path.join(__dirname, '..', 'source-csv', 'users.csv');

const writeData = (data,res) => {
    UserModel.insertMany(data, (err,data) => {
        res.send(data);
    })
}
const deleteAllData = () => {
    UserModel.remove().exec();
}

router.get('/', (req, res) => {

    UserModel.count({}, (err, count) => {
        console.log(count)
        if (!!count) {
            deleteAllData();
        }
        csv()
            .fromFile(pathToCsv)
            .then(jsonObj => {
                UserModel.create(jsonObj)
                res.send("SUCESS ADD USERS")
                })

            })
        })
router.get('/get-users', (req,res,next) => {
    UserModel.count({},(err,count) => {
        if(count !== 0){
            UserModel.find(null,(err,docs) => {
                res.send(docs);
            })
        } else {
            res.send("THERE IS NO USERS")
        }
    })
})
router.post('/add-user', (req,res,next) => {
    const data = {
        userName: "usernameX",
        firstName: "firstnameX",
        lastName: "lastnameX",
        age: 31
    }
    const user = new UserModel(data);
    user.save();
    res.send("ADD ONE USER")
})


router.post('/delete',(req,res,next) => {
    UserModel.remove().exec();
    res.send("DELETE ALL USERS")
})


router.post('/get-csv-file', (req, res) => {
    UserModel.find({}).exec()
    .then(function(docs) {
      UserModel.csvReadStream(docs)
        .pipe(fs.createWriteStream('./csv-from-db/users.csv'));
        res.send("SEND FILE FROM DB TO FOLDER CSV-FROM-DB ")
    });

})

module.exports = router;