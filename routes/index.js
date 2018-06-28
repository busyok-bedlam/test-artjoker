const { Router } = require('express');
const path = require('path');
const csv = require('csvtojson')
const router = Router();

const pathToView = path.join(__dirname, '..', 'views', 'index.html');

router.get('/', (req, res, next) => {
    res.sendFile(pathToView);
})

module.exports = router;