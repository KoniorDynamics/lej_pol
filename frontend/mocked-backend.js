const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const config = {
    port: 5000
};

//Body parser is required to work with the body of the requests.
app.use(express.text());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/authenticate', (req, res) => {
    res.send(200);
});

app.post('/register', (req, res) => {
    res.send(200);
});

app.listen(config.port, () => {
    console.log(`App running on ${config.port}...`);
});
