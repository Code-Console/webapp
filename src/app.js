const express = require('express');
const app = express();
const path = require('path');
const hbs     = require('hbs')
const fetch = require("node-fetch");
const publicDirectoryPath = path.join(__dirname, '..')
app.set('view engine', 'hbs')

app.get('/', (req, res) => {

  fetch('https://hututu.herokuapp.com/weather?address=Boston').then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        res.render('index', {
          title: data.location,
          name: 'Andrew Mead'
        })
        console.log(data.location);
      }
    })
  })



})
app.get('/weather', (req, res) => {
  // All query string key/value pairs are on req.query
  // res.send({'You provided "' + req.query.address + '" as the address.'});
  res.send('{"location":"'+req.query.address+'"}');
})



// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

app.listen(process.env.PORT || 4000, function(){
  console.log('Your node js server is running');
});
const greeter = (name = 'user', age) => {
  console.log('Hello ' + name)
}
greeter() // Will print: Hello Andrew
