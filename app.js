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

// Static middleware
app.use(express.static('public'));

app.get('/add', (req, res) => {

    const blog = new Blog({
        title: 'Whats good pt2',
        snippet: 'Try new things',
        body: 'More about new things'
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
    const blogs = [
        {title: 'Lets get it started', snippet: 'Lorem ipsum dolor sit amet'},
        {title: 'Trying something new', snippet: 'Lorem ipsum dolor sit amet'},
        {title: 'New is the old', snippet: 'Lorem ipsum dolor sit amet'},
    ]
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    // res.send('<p> About page </p>')
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    // res.send('<p> About page </p>')
    res.render('create', { title: 'New Blog' } );
});



//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})