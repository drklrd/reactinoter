var express = require('express');
var app = express();

app.use(express.static('./public'));

var router = express.Router();

router.get('/api/notes', function (req, res) {
    res.json(
        {
            success: 1,
            notes : [
                {
                    note : 'Take this to market'
                },
                {
                    note : 'Buy some stuffs'
                },
                {
                    note : 'Bring home the dragon !'
                }
            ]
        }
    )
})

app.use('/', router);

app.listen('7000', function () {
    console.log('Server running graciously at port 7000');
})