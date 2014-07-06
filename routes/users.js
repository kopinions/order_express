var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/:user_id/orders/:order_id', function (req, res) {
    res.send(200);
});

module.exports = router;
