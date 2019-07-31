const fetch = require("node-fetch");
var router = require('express').Router();

router.get('/', function(req, res) {
    res.send('Index Page');
});

router.get('/about', function(req, res) {
    res.send('About Page');
});
router.get('/snsusers', (req, res) => {
    fetch('https://hututusoftwares.com/sns/index.php/api/Snsapi/users/').then((response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
            res.send(data)
        }
      })
    })
  })
module.exports = router;