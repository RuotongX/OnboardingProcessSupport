const express = require('express');
const onboarderRouter = require('./routers/onboarderRouter');
const suggestRouter = require('./routers/suggestRouter');
const teamRouter = require('./routers/teamRouter');
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get('/', (rep, res) => {
    res.status(200).json({
        message: 'Hello, this is the welcome message from SDM API',
    });
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/onboarder', onboarderRouter);
app.use('/suggest', suggestRouter);
app.use('/team', teamRouter);

module.exports = app;