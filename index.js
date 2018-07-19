const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});

// Connect
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySql connected');
});

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
//app.use(cors());
app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}));


// Create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created');
    });
});

// Create table
app.get('/createtaskstable', (req, res) => {
    let sql = `CREATE TABLE tasks(id int AUTO_INCREMENT, summary VARCHAR(255), date DATE,
    description VARCHAR(255), status VARCHAR(255), PRIMARY KEY(id))`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Tasks table created');
    });
});

// add task
app.post('/addtask', (req, res) => {
    let task = {
        summary: req.body.summary,
        date: req.body.date,
        description: req.body.description,
        status: req.body.status
    };
    let sql = 'INSERT INTO tasks SET ?';
    let query = db.query(sql, task, (err, result) => {
        if(err) {
            res.json({ success: false, message: 'Cannot INSERT into tasks table.' })
        }
        else {
            let task = {
                summary: req.body.summary,
                date: req.body.date,
                description: req.body.description
            }
            res.json({ success: true, message: 'Task successfully inserted.', task: task })
        }
    });
});

// change task's status
app.put('/changetaskstatus/:id', (req, res) => {
    console.log(req.body.status);
    let sql = `UPDATE tasks SET status = '${req.body.status}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) {
            res.json({ success: false, message: 'Cannot UPDATE tasks.', err: err });
        }
        else {
            res.json({ success: true, message: 'Task completed successfully.' });
        }
    });
});

// get single task by id
app.get('/gettaskbyid/:id', (req, res) => {
    let sql = `SELECT * FROM tasks WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, task) => {
        if(err) {
            res.json({ success: false, message: 'Cannot GET single task.', err: err });
        }
        else {
            res.json({ success: true, message: 'Single task fetched successfully.', task: task });
        }
    });
});

// update (edit) task
app.put('/updateTask', (req, res) => {
    let sql = `UPDATE tasks SET summary='${req.body.summary}', date='${req.body.date}',description='${req.body.description}'
    WHERE id=${req.body.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) {
            res.json({ success: false, message: 'Cannot UPDATE task.', err: err });
        }
        else {
            res.json({ success: true, message: 'Task updated successfully.' });
        }
    }); 
});

// delete task
app.delete('/deletetask/:id', (req, res) => {
    let sql = `DELETE FROM tasks WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) {
            res.json({ success: false, message: 'Cannot DELETE task.' });
        }
        else {
            res.json({ success: true, message: 'Task deleted successfully.' });
        }
    });
});

// get tasks sorted by date
app.get('/getsortedbydate', (req, res) => {
    if(req.query.sorting === 'unsorted') {
                if(req.query.completed === 'true') {
                    var sql = 'SELECT * FROM tasks';
                }
                else {
                    var sql = `SELECT * FROM tasks WHERE status<>'Completed'`;
                }
                let query = db.query(sql, (err, tasks) => {
                    if(err) {
                        res.json({ success: false, message: 'Cannot GET tasks.' });
                    }
                    else {
                        res.json({ success: true, message: 'Task(s) fetched successfully.', tasks: tasks });
                    }
                });
    }
    else if(req.query.sorting === 'ascending') {
            if(req.query.completed === 'true') {
                var sql = `SELECT * FROM tasks ORDER BY date ASC`;
            }
            else {
                var sql = `SELECT * FROM tasks WHERE status<>'Completed' ORDER BY date ASC`;
            }
            let query = db.query(sql, (err, tasks) => {
                if(err) {
                    res.json({ success: false, message: 'Cannot GET tasks.' });
                }
                else {
                    res.json({ success: true, message: 'Task(s) fetched successfully.', tasks: tasks });
                }
            });
    }
    else if(req.query.sorting === 'descending') {
            if(req.query.completed === 'true') {
                var sql = `SELECT * FROM tasks ORDER BY date DESC`;
            }
            else {
                var sql = `SELECT * FROM tasks WHERE status<>'Completed' ORDER BY date DESC`;
            }
            let query = db.query(sql, (err, tasks) => {
                if(err) {
                    res.json({ success: false, message: 'Cannot GET tasks.' });
                }
                else {
                    res.json({ success: true, message: 'Task(s) fetched successfully.', tasks: tasks });
                }
            });
    }
});



app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});