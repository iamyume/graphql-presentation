const path = require('path');
const express = require('express');
const graphql = require('./graphql');
const app = express();
const port = 8888;

app.use('/node_modules', express.static(path.join(__dirname,'..','node_modules/')));
app.all('/graphql', graphql);
app.use('/', express.static(path.join(__dirname,'..','public')));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});