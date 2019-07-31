var router = require('express').Router();

router.get('/', function(req, res) {
    res.send('Users Index Page');
});

router.get('/list', function(req, res) {
    res.send('Users List Page');
});
app.get('/weather', (req, res) => {res.send('{"location":"'+req.query.address+'"}');})
app.get('/yogesh', function(req, res) {res.sendFile(path.join(__dirname, 'search.html'));});
app.use(express.json())
app.post('/users', (req, res) => {
  const user = new User(req.body)
  user.save().then(() => {
      res.send(user)
  }).catch((e) => {
      res.status(400).send(e)
  }) 
})


app.get('/users/:id', async (req, res) => { 
  try {
    const _id = req.params.id // Access the id provided
    User.findById(_id).then((user) => { 
      if (!user) {
        return res.status(404).send() 
      }
      res.send(user)
      }).catch((e) => {
          res.status(500).send()
    })
    
  } catch (e) {
    res.status(500).send(e+"");
  }
});
module.exports = router;