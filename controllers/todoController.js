// need this to access POST variables in req.body
const bodyParser = require('body-parser');

const mongoose = require('mongoose');


// connect to the database
mongoose.connect('mongodb://test:test@ds151702.mlab.com:51702/todo-netninja');



// create a mongoose Schema - like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});
// compile schema into a mongoose Model
var Todo = mongoose.model('Todo', todoSchema);


// setup middleware to read post variables in req.body
var urlencodedParser = bodyParser.urlencoded({extended: false});


// dummy data for local storage without database
// var serverData = [
//     {item: 'get milk'},
//     {item: 'walk dog'},
//     {item: 'kick some coding ass'}
// ]

module.exports = function(app) {


app.get('/', function(req, res) {
    res.redirect('/todo')
})


app.get('/todo', function(req, res) {
    // get data from mongodb and pass it to view
    Todo.find({}, function(err, allTodos) {
        if (err) throw err;
        res.render('todo', {todos: allTodos});
    })

});

// add new item to list
// added middleware to access POST variables in req.body
app.post('/todo', urlencodedParser, function(req, res) {
    console.log('server recieved: ', req.body);

    // get data from the view (req.body) and add it to mongodb
    // old local storage way === serverData.push(req.body);
    var newTodo = Todo(req.body).save(function(err, createdTodo) {
        if (err) throw err;
        res.json(createdTodo);
    })

    // old local storage way === res.json(serverData);
});

app.delete('/todo/:item', function(req, res) {
    // delete requested item from mongodb
    var todoToRemove = req.params.item.replace(/\-/g, " ");  // replace all hyphens with spaces bc hyphens are added in url :item
    Todo.find({item: todoToRemove}).remove(function(err, allTodos) {
        if (err) throw error;
        res.json(allTodos);
    })

    // old way local storage
    // serverData = serverData.filter(function(todo) {
    //     return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    // res.json(serverData);
});

}
