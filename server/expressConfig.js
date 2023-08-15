const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const bundler = require('./clientBundler');

const app = express();
const template = require('../template').default;
const accountRouter = require('./routers/accountRouter');
const docRouter = require('./routers/docRouter');
const espaRouter = require('./routers/espaRouter');
const mimozaRouter = require('./routers/mimozaRouter');
const presRouter = require('./routers/presentationRouter');

bundler.compile(app);
app.use('/dist', express.static(path.join(__dirname, "../dist")));
app.use('/client', (req, res) => {
    res.status(200).send(template());
});
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(accountRouter);
app.use(docRouter);
app.use(espaRouter);
app.use(mimozaRouter);
app.use(presRouter);

module.exports = app;