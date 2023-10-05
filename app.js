const express = require('express');


// express app
const app = express(); 

// register view engine 
app.set('view engine', 'ejs')

// listen for requests 
app.listen(3000);

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