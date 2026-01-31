const express = require('express');
const db = require('./config/db_config');
const cookies = require('cookie-parser');
const path = require('path');
const port = process.env.PORT;
const api = process.env.HOST;
const app = express();

app.use(express.static(path.join(__dirname , 'public')));
app.use(express.json());
app.use(cookies());


app.use('/',require('./routes/pages_R'));
app.use('/users',require('./routes/users_R'));
app.use('/auth',require('./routes/auth_R'));
app.use('/categories',require('./routes/categories_R'));
app.use('/tasks',require('./routes/tasks_R'));

app.listen(port,()=>{console.log(`http://${api}:${port}`)})