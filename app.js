const express = require('express');


// express app
const app = express(); 


// routes
app.get('/', (req, res) => {
    res.send('<p> Hello Shda </p>')
});

app.get('/about', (req, res) => {
    res.send('<p> Hello about </p>')
});


// listen for requests 
app.listen(3000, () =>{
    console.log('listening on port 3000')
});