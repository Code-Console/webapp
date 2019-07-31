const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const User = mongoose.model('User', {name: {type: String},age: {type: Number}});
var router = express.Router();

router.use(express.json())

router.get('/', function(req, res) {res.send('Users Index Page');});
router.get('/list', function(req, res) {res.send('Users List Page');});
router.get('/weather', (req, res) => {res.send('{"location":"'+req.query.address+'"}');})
router.get('/yogesh', function(req, res) {res.sendFile(path.join(__dirname, 'search.html'));});
router.get('/all', function(req, res) {
    try {
        const _id = req.params.id // Access the id provided
        User.find().then((users) => { 
          if (!users) {
            return res.status(404).send() 
          }
          res.send(users)
          }).catch((e) => {
              res.status(500).send()
        })
      } catch (e) {
        res.status(500).send(e+"");
      }
});
router.get('/:id', async (req, res) => { 
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

router.post('/add', (req, res) => {
  const user = new User(req.body)
  user.save().then(() => {
      res.send(user)
  }).catch((e) => {
      res.status(400).send(e)
  }) 
});

module.exports = router;