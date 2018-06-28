const { Router } = require('express');
const path = require('path');
const csv = require('csvtojson')
const router = Router();
const UserModel = require('../models/user-model');


const pathToCsv = path.join(__dirname, '..', 'source', 'users.csv');

const writeData = (data,res) => {
    UserModel.insertMany(data, (err,data) => {
        res.send(data);
    })
}
const deleteAllData = () => {
    UserModel.remove().exec();
}

router.get('/', (req,res,next) => {
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
// router.get('/get', (req,res,next) => {
//     const data = {
//         userName: "1111",
//         firstName: "2222",
//         lastName: "3333",
//         age: 31
//     }
//     const user = new UserModel(data);
//     user.save();
// })
router.post('/delete',(req,res,next) => {
    UserModel.remove().exec();
    res.send("DELETE ALL USERS")
})
router.post('/savetodb',(req,res,next) => {
    UserModel.count({},(err,count) => {
        console.log(count)
        if(!!count){
            deleteAllData();
        }
        csv()
        .fromFile(pathToCsv)
        .then( jsonObj => {
            writeData(jsonObj,res);
            res.send("SUCESS ADD USERS")
        })
    })
})
module.exports = router;