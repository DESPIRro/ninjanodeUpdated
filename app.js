const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/Blog.js');
const { render } = require('ejs');

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
//this comes built into express now, so we no longer need to use bodyparser.

app.use(express.urlencoded({ extended: true }));

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
  Blog.find()
    .sort({ createdAt: -1 })
    .then((data) => {
      res.render('index', { title: 'All Blogs', blogs: data });
    })
    .catch((err) => {
      console.log(err);
    });
  sessionStorage.removeItem('yes', 'no')
});

//create new blog

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((data) => {
      console.log('sucessfully saved');
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

//get a single blog
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', {blog:result, title: 'Blog details'})
    })
    .catch(err => {
      console.log(err)
    })
});

//delete a single blog
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      response.json({redirect:'/blogs'})
    })
    .catch(err => {
      console.log(err)
    })
});

//AJAX request are done on the front end using javascript
//Therefore we cannot use the redirect method in node
//instead we need to return the json text data inside node
//and perform the redirect within the fetch request. 
//we send the json from node to fetch using res.json


app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
