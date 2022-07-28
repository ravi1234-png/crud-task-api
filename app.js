const express = require('express');
const app = express();

const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/TaskList');
const Task = require('./database/models/task');

/*
cors(cross origin request security)
Backend -http://localhost/3000
Frontend -http://localhost/4200
*/
//3rd part library like  app.use(cors())
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Example of middleware
app.use(express.json());

//Routes or REST API Endpoints or RESTFul webservices Endpoints
/*
TaskList - Create ,Update,ReadtaskListId,ReadallTaskList
Task - Create ,Update,ReadtaskId,ReadallTask
*/

// Routes or Api endpoints for TaskList model
// Get all Task Lists
//http://localhost:3000/tasklists  =>[{TastList},{TaskList} ]
//
app.get('/tasklists', (req, res) => {
    TaskList.find({})
        .then(lists => {
            res.status(200).send(lists);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });

});
//Endpoints to get one Tasklist by tasklistId : http://localhost/62de508604ccc619fac32948
app.get(
    '/tasklists/:tasklistId', (req, res) => {
        let tasklistId = req.params.tasklistId;
        TaskList.find({ _id: tasklistId })
            .then((taskList) => {
                res.status(200).send(taskList)

            })
            .catch((error) => { console.log(error) });

    });
//route or endpoint for creating a TaskList

app.post('/tasklists', (req, res) => {
    // console.log('Hello i am inside post method')

    console.log(req.body);
    let taskListObj = { 'title': req.body.title };
    TaskList(taskListObj).save()
        .then((tasklists) => {
            res.status(201).send(tasklists);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
});

//PUT is full update of object
app.put('/tasklists/:tasklistId', (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
        .then((taskList) => {
            res.status(200).send(taskList)
        })
        .catch((error) => { console.log(error) });

});

//PATCH is partial update of one field of an object
app.patch('/tasklists/:tasklistId', (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
        .then((taskList) => {
            res.status(200).send(taskList)
        })
        .catch((error) => { console.log(error) });
});

//Delete a tasklist by Id
app.delete('/tasklists/:tasklistId', (req, res) => {
    TaskList.findByIdAndDelete(req.params.tasklistId)
        .then((taskList) => {
            res.status(200).send(taskList)
        })
        .catch((error) => { console.log(error) });
});

/*CRUD operation for task, a task should always belong to a Tasklist*/
//Get all task for 1 Tasklist, http://localhost:3000/tasklists/:tasklistId/tasks/:taskId
app.get('/tasklists/:tasklistId/tasks', (req,res)=>{
    Task.find({_taskListId: req.params.tasklistId})
    .then((tasks) => {
        res.status(200).send(tasks)

    })
    .catch((error) => { console.log(error) });

});

//Create a task inside a particular task List
app.post('/tasklists/:tasklistId/tasks/', (req, res) => {
    console.log(req.body);
    let taskObj = { 'title': req.body.title, _taskListId: req.params.tasklistId };
    Task(taskObj).save()
        .then((task) => {
            res.status(201).send(task);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
});

//http://localhost:3000/tasklists/:tasklistId/tasks/:taskId
//Get 1 task inside 1 TaskList
app.get('/tasklists/:tasklistId/tasks/:taskId', (req,res)=>{
    Task.findOne({_taskListId: req.params.tasklistId, _id: req.params.taskId})
    .then((task) => {
        res.status(200).send(task)

    })
    .catch((error) => { console.log(error) });

});

//update 1 task belonging to 1 Tasklist
app.patch('/tasklists/:tasklistId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({_taskListId: req.params.tasklistId,_id:req.params.taskId }, { $set: req.body })
        .then((task) => {
            res.status(200).send(task)
        })
        .catch((error) => { console.log(error) });
});

//Delete 1 task belonging to 1 TaskList
app.delete('/tasklists/:tasklistId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({_taskListId: req.params.tasklistId,_id:req.params.taskId }, { $set: req.body })
        .then((task) => {
            res.status(200).send(task)
        })
        .catch((error) => { console.log(error) });
    });
    
// app.listen(3000, function() {
//     console.log("Server started on port 3000")
// } );

app.listen(3000, () => {
    console.log("Server started on port 3000!")
});