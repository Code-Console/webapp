const express = require('express');
const app = express();
const hbs     = require('hbs')
const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017/'
const databaseName = 'task-manager'
var Promise = require('promise');
const mongoose = require('mongoose')
mongoose.connect(connectionURL+databaseName, {useNewUrlParser: true,useCreateIndex: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we're connected!");});
app.set('view engine', 'hbs')

app.use('/', require('../routes/index'));
app.use('/users', require('../routes/users'));

app.listen(process.env.PORT || 4000, function(){console.log('Your node js server is running');});

const callDB = (name = 'user', age) => {
  console.log('Hello ' + name);
  MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {return console.log('Unable to connect to database!')}
    const db = client.db(databaseName)
    db.collection('users').insertMany([{name: 'Andrew',age: 27 },{name: 'abc',age: 27 },{name: 'xyz',age: 27 }]);
    const { MongoClient, ObjectID } = require('mongodb');
    const id = new ObjectID();
    console.log(id); // Print new id to the console
    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {console.log(error);console.log(tasks);});
    db.collection('tasks').findOne({ _id: new ObjectID("5d3f08396ee7c2188f737428") }, (error, task) => {console.log("~ "+JSON.stringify(task));});
    db.collection('tasks').deleteMany({completed: false}).then((result) => {console.log(result)}).catch((error) => {console.log(error)});
    db.collection('tasks').insertMany([{description: ''+new Date().getTime(),completed: false },{description: ''+new Date().getTime(),completed: false },{name: ''+new Date().getTime(),completed: false }],(error, result) => {
      if (error) {return console.log('Unable to insert tasks!');}console.log(result.ops)});
  });
}//callDB() // Will print: Hello Andrew

const callMongoose = () => {
  console.log("callMongoose");
  mongoose.connect(connectionURL+databaseName, {useNewUrlParser: true,useCreateIndex: true});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {console.log("we're connected!");});

  const User = mongoose.model('User', {
    name: {type: String},
    age: {type: Number}
  });
  const me = new User({name: 'yogesh',age: 28 });
  //me.save().then(() => {console.log(me)}).catch((error) => {console.log('Error!', error)});
  const doWork = async () => {
    const users = await User.find({ age: { $gte: 18 }});
    console.log(users);
  }
  // const doWork = async () => {
  //   console.log("deletedCount ");
  //   const res = await User.deleteMany({ id: { $gte: 1 } });
  //   console.log("deletedCount = " + res.deletedCount);
  // }
   doWork();

  
  
}//callMongoose();
