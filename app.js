const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


// express app
const app = express(); 

//connect to mongodb
const dbURI = 'mongodb+srv://sirdon3blogs:test1234@cluster0.chsiogn.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine 
app.set('view engine', 'ejs')

// Middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/add', (req, res) => {

    const blog = new Blog({
        title: 'Whats good pt4',
        snippet: 'Try new things',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));

});

// routes
app.get('/', (req, res) => {
    // res.send('<p> Hello Shda </p>')
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p> About page </p>')
    res.render('about', { title: 'About' });
});


// blog routes 
app.get('/blogs', (req, res) => {
    
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            
            res.render('index', { title: 'All Blogs', blogs: result});

        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details'});
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/create', (req, res) => {
    // res.send('<p> About page </p>')
    res.render('create', { title: 'New Blog' } );
});



//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})