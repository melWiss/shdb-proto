const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
const hostname = '0.0.0.0';

function cout(v) {
    console.log(v);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

app.get('/',(req,res)=>{
    res.send("<h1>Welcome to ShakshoukaDB Prototype!</h1>");
});

app.use((req, res, nex) => {
    switch (req.method) {
        case 'GET':
            if (req.query.docs == null) {
                fs.readFile("./db" + req.path + "/data.json", (err, data) => {
                    if (err) {
                        res.contentType('application/json');
                        res.status(404);
                        res.send({
                            "path": req.path,
                            "query": req.query,
                            "url": req.url,
                            "method": req.method,
                            "code": 404,
                            "error": err
                        });
                    } else {
                        res.contentType('application/json');
                        res.status(200);
                        res.send({
                            "path": req.path,
                            "query": req.query,
                            "url": req.url,
                            "method": req.method,
                            "code": 200,
                            "data": JSON.parse(data)
                        });
                    }
                });
            } else {
                switch (req.query.docs.toUpperCase()) {
                    case "ALL":
                        fs.readdir("./db" + req.path, (err, docs) => {
                            if (err) {
                                res.contentType('application/json');
                                res.status(404);
                                res.send({
                                    "path": req.path,
                                    "query": req.query,
                                    "url": req.url,
                                    "method": req.method,
                                    "code": 404,
                                    "error": err
                                });
                            } else {
                                res.contentType('application/json');
                                res.status(200);
                                res.send({
                                    "path": req.path,
                                    "query": req.query,
                                    "url": req.url,
                                    "method": req.method,
                                    "code": 200,
                                    "docs": docs
                                });
                            }
                        });
                        break;

                    default:
                        const nbr = parseInt(req.query.docs);
                        if (nbr > 0) {
                            fs.readdir("./db" + req.path, (err, docs) => {
                                if (err) {
                                    res.contentType('application/json');
                                    res.status(404);
                                    res.send({
                                        "path": req.path,
                                        "query": req.query,
                                        "url": req.url,
                                        "method": req.method,
                                        "code": 404,
                                        "error": err
                                    });
                                } else {
                                    const ndocs = docs.slice(0, nbr - 1);
                                    res.contentType('application/json');
                                    res.status(200);
                                    res.send({
                                        "path": req.path,
                                        "query": req.query,
                                        "url": req.url,
                                        "method": req.method,
                                        "code": 200,
                                        "docs": ndocs
                                    });
                                }

                            });
                        } else {
                            fs.readdir("./db" + req.path, (err, docs) => {
                                if (err) {
                                    res.contentType('application/json');
                                    res.status(404);
                                    res.send({
                                        "path": req.path,
                                        "query": req.query,
                                        "url": req.url,
                                        "method": req.method,
                                        "code": 404,
                                        "error": err
                                    });
                                } else {
                                    const ndocs = docs.slice(docs.length + nbr, docs.length);
                                    res.contentType('application/json');
                                    res.status(200);
                                    res.send({
                                        "path": req.path,
                                        "query": req.query,
                                        "url": req.url,
                                        "method": req.method,
                                        "code": 200,
                                        "docs": ndocs
                                    });
                                }

                            });
                        }
                        break;
                }
            }
            break;
        case 'POST':
            fs.mkdir("./db" + req.path, { recursive: true }, (err) => {
                if (err) {
                    res.contentType('application/json');
                    res.status(404);
                    res.send({
                        "path": req.path,
                        "query": req.query,
                        "url": req.url,
                        "method": req.method,
                        "code": 404,
                        "error": err
                    });
                } else {
                    fs.stat("./db" + req.path + "/data.json", (err, stats) => {
                        if (err) {
                            fs.writeFile("./db" + req.path + "/data.json", JSON.stringify(req.body), (err, data) => {
                                if (err) {
                                    res.contentType('application/json');
                                    res.status(404);
                                    res.send({
                                        "path": req.path,
                                        "query": req.query,
                                        "url": req.url,
                                        "method": req.method,
                                        "code": 404,
                                        "error": err
                                    });
                                } else {
                                    res.contentType('application/json');
                                    res.status(200);
                                    res.send({
                                        "path": req.path,
                                        "query": req.query,
                                        "url": req.url,
                                        "method": req.method,
                                        "code": 200,
                                        "data": data
                                    });
                                }
                            });
                        } else {
                            res.contentType('application/json');
                            res.status(404);
                            res.send({
                                "path": req.path,
                                "query": req.query,
                                "url": req.url,
                                "method": req.method,
                                "code": 404,
                                "error": err
                            });
                        }
                    });
                }
            });
            break;
        case 'PUT':
            fs.mkdir("./db" + req.path, { recursive: true }, (err) => {
                if (err) {
                    res.contentType('application/json');
                    res.status(404);
                    res.send({
                        "path": req.path,
                        "query": req.query,
                        "url": req.url,
                        "method": req.method,
                        "code": 404,
                        "error": err
                    });
                } else {
                    fs.stat("./db" + req.path + "/data.json", (err, stats) => {
                        if (err) {
                            res.contentType('application/json');
                            res.status(404);
                            res.send({
                                "path": req.path,
                                "query": req.query,
                                "url": req.url,
                                "method": req.method,
                                "code": 404,
                                "error": err
                            });
                        } else {
                            fs.writeFile("./db" + req.path + "/data.json", JSON.stringify(req.body), (err, data) => {
                                if (err) {
                                    res.contentType('application/json');
                                    res.status(404);
                                    res.send({
                                        "path": req.path,
                                        "query": req.query,
                                        "url": req.url,
                                        "method": req.method,
                                        "code": 404,
                                        "error": err
                                    });
                                } else {
                                    res.contentType('application/json');
                                    res.status(200);
                                    res.send({
                                        "path": req.path,
                                        "query": req.query,
                                        "url": req.url,
                                        "method": req.method,
                                        "code": 200,
                                        "data": data
                                    });
                                }
                            });
                        }
                    });
                }
            });
            break;
        case 'DELETE':
            if (req.query.docs == null) {
                fs.unlink("./db" + req.path + "/data.json", (err) => {
                    if (err) {
                        res.contentType('application/json');
                        res.status(404);
                        res.send({
                            "path": req.path,
                            "query": req.query,
                            "url": req.url,
                            "method": req.method,
                            "code": 404,
                            "error": err
                        });
                    } else {
                        res.contentType('application/json');
                        res.status(200);
                        res.send({
                            "path": req.path,
                            "query": req.query,
                            "url": req.url,
                            "method": req.method,
                            "code": 200,
                            "message": "./db" + req.path + "/data.json is deleted."
                        });
                    }
                });
            } else {
                switch (req.query.docs.toUpperCase()) {
                    case "ALL":
                        fs.rmdir("./db" + req.path, (err, docs) => {
                            if (err) {
                                res.contentType('application/json');
                                res.status(404);
                                res.send({
                                    "path": req.path,
                                    "query": req.query,
                                    "url": req.url,
                                    "method": req.method,
                                    "code": 404,
                                    "error": err
                                });
                            } else {
                                res.contentType('application/json');
                                res.status(200);
                                res.send({
                                    "path": req.path,
                                    "query": req.query,
                                    "url": req.url,
                                    "method": req.method,
                                    "code": 200,
                                    "message": "./db" + req.path + " is deleted."
                                });
                            }
                        });
                        break;

                    default:
                        const nbr = parseInt(req.query.docs);
                        if (nbr > 0) {
                            fs.readdir("./db" + req.path, (err, docs) => {
                                if (err) {
                                    res.contentType('application/json');
                                    res.status(404);
                                    res.send({
                                        "path": req.path,
                                        "query": req.query,
                                        "url": req.url,
                                        "method": req.method,
                                        "code": 404,
                                        "error": err
                                    });
                                } else {
                                    const ndocs = docs.slice(0, nbr - 1);
                                    let check = true;
                                    ndocs.forEach((v, i, l) => {
                                        fs.unlink("./db" + req.path + "/" + v, (err) => {
                                            if (err) check = false;
                                        });
                                    });
                                    if (!check) {
                                        res.contentType('application/json');
                                        res.status(404);
                                        res.send({
                                            "path": req.path,
                                            "query": req.query,
                                            "url": req.url,
                                            "method": req.method,
                                            "code": 404,
                                            "error": err
                                        });
                                    } else {
                                        res.contentType('application/json');
                                        res.status(200);
                                        res.send({
                                            "path": req.path,
                                            "query": req.query,
                                            "url": req.url,
                                            "method": req.method,
                                            "code": 200,
                                            "message": "./db" + req.path + " docs are deleted."
                                        });
                                    }
                                }
                            });
                        } else {
                            fs.readdir("./db" + req.path, (err, docs) => {
                                if (err) {
                                    res.contentType('application/json');
                                    res.status(404);
                                    res.send({
                                        "path": req.path,
                                        "query": req.query,
                                        "url": req.url,
                                        "method": req.method,
                                        "code": 404,
                                        "error": err
                                    });
                                } else {
                                    const ndocs = docs.slice(docs.length + nbr, docs.length);
                                    let check = true;
                                    ndocs.forEach((v, i, l) => {
                                        fs.unlink("./db" + req.path + "/" + v, (err) => {
                                            if (err) check = false;
                                        });
                                    });
                                    if (!check) {
                                        res.contentType('application/json');
                                        res.status(404);
                                        res.send({
                                            "path": req.path,
                                            "query": req.query,
                                            "url": req.url,
                                            "method": req.method,
                                            "code": 404,
                                            "error": err
                                        });
                                    } else {
                                        res.contentType('application/json');
                                        res.status(200);
                                        res.send({
                                            "path": req.path,
                                            "query": req.query,
                                            "url": req.url,
                                            "method": req.method,
                                            "code": 200,
                                            "message": "./db" + req.path + " docs are deleted."
                                        });
                                    }
                                }

                            });
                        }
                        break;
                }
            }
            break;

        default:
            res.send({
                "path": req.path,
                "query": req.query,
                "url": req.url,
                "method": req.method
            });
            break;
    }
});

app.listen(port, hostname, () => {
    cout(`Listening on ${hostname}:${port}...`);
});