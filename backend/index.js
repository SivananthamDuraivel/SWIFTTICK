require('dotenv').config()

const express = require('express') 
const mongoose = require('mongoose') 
const cors = require('cors') 
const TodoModel = require("./models/todoList") 
  
var app = express(); 
app.use(cors()); 
app.use(express.json()); 
  
 mongoose.connect(process.env.MONGO_URI)
 .then(console.log("server connected"))
 .catch(err=>{
    console.log(err);
 })
  
app.get('/',(req,res)=>{
    console.log("working")
})

app.get("/getTodoList", (req, res) => { 
    TodoModel.find({}) 
        .then((todoList) => res.json(todoList)) 
        .catch((err) => res.json(err)) 
}); 
  
// Add new task to the database 
app.post("/addTodoList", (req, res) => { 
    TodoModel.create({ 
        task: req.body.task, 
        status: req.body.status, 
        deadline: req.body.deadline,  
    }) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
        console.log("todo added");
}); 
  
// Update task fields (including deadline) 
app.post("/updateTodoList/:id", (req, res) => { 
    const id = req.params.id; 
    const updateData = { 
        task: req.body.task, 
        status: req.body.status, 
        deadline: req.body.deadline,  
    }; 
    TodoModel.findByIdAndUpdate(id, updateData) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
}); 
  
// Delete task from the database 
app.delete("/deleteTodoList/:id", (req, res) => { 
    const id = req.params.id; 
    TodoModel.findByIdAndDelete({ _id: id }) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
}); 
  
app.listen(process.env.PORT_NO, () => { 
    console.log('Server running ',process.env.PORT_NO); 
}); 