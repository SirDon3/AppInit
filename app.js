const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


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

// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
  });
  
app.get('/about', (req, res) => {
      res.render('about', { title: 'About' });
  });

// Blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})