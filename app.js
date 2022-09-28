const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/Blog.js')

// express app
const app = express();

//connection to mogodb. 
//Mongoose.connect creates a promise, so .then and .catch are stringed
//We dont want to set up server until database connected
const dbURI = 'mongodb+srv://test:test@todo.qlw4aff.mongodb.net/blogs?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

  // listen for requests
;

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/add-blog', (req, res) => {
  
  const blog= new Blog({
    title: 'feelings', 
    snippet: 'ssdfs',
    body: 'hdush'
  });
  blog.save()
    .then((data) => { 
      res.send(data)
    })
    .catch((err) => { 
      console.log(err);
    });
    })
 

app.get('/blog', (req,res) => {
  Blog.find({}, (err,data) => { 
    res.send(data)
  })
})





app.get('/', (req, res) => {
  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'Mario finds stars',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'How to defeat bowser',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
