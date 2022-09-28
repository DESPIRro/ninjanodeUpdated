const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/Blog.js');

// express app
const app = express();

//connection to mogodb.
//Mongoose.connect creates a promise, so .then and .catch are stringed
//We dont want to set up server until database connected
const dbURI =
  'mongodb+srv://test:test@todo.qlw4aff.mongodb.net/blogs?retryWrites=true&w=majority';
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// listen for requests

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.use(morgan('dev'));
app.use(express.static('public'));

//normal routes

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//blogs routes


//get all blogs 
app.get('/blogs', (req, res) => {
  Blog.find().sort({createdAt:-1})
    .then((data) => {
      res.render('index', { title: 'All Blogs', blogs: data })
    })
    .catch((err) => {
      console.log(err)
    })
});

//create new blog 

app.post('/blogs', (req, res) => {


})

//get a single blog
app.get('/blogs:id', (req, res) => {


})

//delete a single blog
app.delete('/blogs:id', (req, res) => {


})



app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
