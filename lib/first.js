const express = require('express');

const app = express();
const port = 3000;
const hostname = '0.0.0.0';

var db = {};
function cout(v) {
    console.log(v);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());


app.get('/users', (req, res, nex) => {
    res.contentType('application/json');
    if (req.query.id != null)
        res.send(db[req.query.id]);
    else
        res.send(db);
});


app.post('/users', (req, res, nex) => {
    res.contentType('application/json');
    if (db[req.body.id] == null)
        db[req.body.id] = req.body;
    res.send(db);
});
app.put('/users', (req, res, nex) => {
    res.contentType('application/json');
    if (db[req.body.id] != null)
        db[req.body.id] = req.body;
    res.send(db);
});
app.delete('/users', (req, res, nex) => {
    res.contentType('application/json');
    if (db[req.body.id] != null)
        delete db[req.body.id];
    res.send(db);
});

app.get('/', (req, res, nex) => {
    res.send("<h1>Welcome brother!</h1>");
});

app.listen(port, hostname, () => {
    cout(`Listening on ${hostname}:${port}...`);
});