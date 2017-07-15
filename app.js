const express = require('express');
const app = express();


var todoController = require('./controllers/todoController'); // returns a function




// setup template engine
app.set('view engine', 'ejs');

// static files
// use the express static middleware on ALL routes (b/c first parameter left out)
app.use(express.static('public'));


// fire controllers
todoController(app);


// listen to port
app.listen(3000, function() {
    console.log('listening on port 3000');
})
