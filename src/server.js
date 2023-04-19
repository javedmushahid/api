const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./UserModel');

const app = express();
const port = 3006;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.post('/register', function(req, res) {
  const newUser = new User({ email: req.body.email });
  newUser.setPassword(req.body.password);
  newUser.save(function(err) {
    if (err) { return res.status(500).send(err); }
    return res.redirect('/');
  });
});

app.use(function(req, res, next) {
  // check if token is present in the request header
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token not found.' });
  }

  // verify the token
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }

    // set the user object in the request for use in other middleware and routes
    req.user = decoded.user;
    next();
  });
});


app.listen(port, function() {
  console.log(`Server running on http://localhost:${port}`);
});


// Below are some examples of promises in Javascript

// Examples of r Promise.all, resolve , reject

// const promise1 = Promise.resolve(1);
// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(2);
//   }, 2000);
// });
// const promise3 = Promise.reject('Error: Promise 3 failed');

// Promise.all([promise1, promise2, promise3])
//   .then((results) => {
//     console.log(results); // Output: ['1', '2']
//   })
//   .catch((error) => {
//     console.log(error); // Output: 'Error: Promise 3 failed'
//   });
//   const promise1 = Promise.resolve(1);
//   const promise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(2);
//     }, 2000);
//   });
//   const promise3 = Promise.reject('Error: Promise 3 failed');
  
//   Promise.all([promise1, promise2, promise3])
//     .then((results) => {
//       console.log(results); // Output: ['1', '2']
//     })
//     .catch((error) => {
//       console.log(error); // Output: 'Error: Promise 3 failed'
//     });
//     const promise1 = Promise.resolve(1);
//     const promise2 = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(2);
//       }, 2000);
//     });
//     const promise3 = Promise.reject('Error: Promise 3 failed');
    
//     Promise.all([promise1, promise2, promise3])
//       .then((results) => {
//         console.log(results); // Output: ['1', '2']
//       })
//       .catch((error) => {
//         console.log(error); // Output: 'Error: Promise 3 failed'
//       });


// below example of Aggregate lookup property in MOngodb

// 4) Example for Aggregate Lookup property

// Perform an aggregation on the "orders" collection




// db.orders.aggregate([
  
//   // Join the "customers" collection with the "orders" collection
//   {
//     $lookup: {
//       from: "customers", // collection to join
//       localField: "customerId", // field from the "orders" collection
//       foreignField: "_id", // field from the "customers" collection
//       as: "customer" // output field that contains the matching documents from the "customers" collection
//     }
//   },
  
//   // Flatten the resulting array from the previous stage
//   {
//     $unwind: "$customer"
//   },
  
//   // Project only the desired fields from the joined documents
//   {
//     $project: {
//       _id: 1,
//       total: 1,
//       date: 1,
//       "customer.name": 1,
//       "customer.email": 1
//     }
//   }
// ])






// 5) Example for populate on a array field (where show ref id in a array)



// Post model
// const postSchema = new mongoose.Schema({
//   title: String,
//   body: String,
//   comments: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Comment'
//   }]
// });

// const Post = mongoose.model('Post', postSchema);

// // Comment model
// const commentSchema = new mongoose.Schema({
//   text: String,
//   author: String
// });

// const Comment = mongoose.model('Comment', commentSchema);

// // Populate comments on a specific post
// Post.findById(postId)
//   .populate('comments') // populate the comments field with actual comment objects
//   .exec(function(err, post) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(post.comments); // will show an array of comment objects instead of just their _id values
//   });

// 6) 4-5 Socket emit and On function example including socket connection .

// const app = require('express')();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// const users = {};

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('join', (username) => {
//     console.log(username + ' joined the chat');
//     users[socket.id] = username;
//     socket.broadcast.emit('user joined', username);
//   });

//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//     const sender = users[socket.id];
//     io.emit('chat message', { sender, msg });
//   });

//   socket.on('disconnect', () => {
//     console.log(users[socket.id] + ' disconnected');
//     socket.broadcast.emit('user left', users[socket.id]);
//     delete users[socket.id];
//   });
// });

// http.listen(3000, () => {
//   console.log('listening on *:3000');
// });




// 7) Add indexing for Schema's to improve



// we use adding indexes to a schema can improve query performance and speed up database operations

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   name: String,
//   email: String,
//   age: Number
// });

// // Adding index to email field
// userSchema.index({ email: 1 });

// // Adding compound index to name and age fields
// userSchema.index({ name: 1, age: 1 });

// // Adding unique index to email field
// userSchema.index({ email: 1 }, { unique: true });

// // Adding partial index to age field where age is greater than or equal to 18
// userSchema.index({ age: 1 }, { partialFilterExpression: { age: { $gte: 18 } } });

// const User = mongoose.model('User', userSchema);




