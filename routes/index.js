var router = require('express').Router();

router.get('/index', function(req, res) {
    res.send('Index Page');
});

router.get('/about', function(req, res) {
    res.send('About Page');
});
app.get('/', (req, res) => {
    fetch('https://hututu.herokuapp.com/weather?address=India').then((response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else { res.render('index', {
            title: data.location,
            name: 'Andrew Mead'
          });
          console.log(data.location);
        }
      })
    })
  })
module.exports = router;