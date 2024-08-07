// Create web server
// npm install express
// npm install body-parser
// npm install mongoose
// npm install ejs
// npm install express-sanitizer
// npm install method-override
// npm install express-session
// npm install connect-flash

// Import required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');
var expressSanitizer = require('express-sanitizer');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');

// Create an express application
var app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser module to parse incoming request bodies
app.use(bodyParser.urlencoded({extended: true}));

// Use the express-sanitizer module to sanitize user input
app.use(expressSanitizer());

// Use the method-override module to allow PUT and DELETE requests
app.use(methodOverride('_method'));

// Use the express-session module to manage session data
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Use the connect-flash module to display messages to the user
app.use(flash());

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/comments');

// Create a Mongoose schema
var commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});

// Create a Mongoose model
var Comment = mongoose.model('Comment', commentSchema);

// Create a new comment
// Comment.create({
//   name: 'John Doe',
//   comment: 'This is a comment.'
// });

// Set up routes
app.get('/', function(req, res) {
  res.redirect('/comments');
});
