require('dotenv').config();

var express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const Utilities = require('./modules/utilities/utilities');
const path = require('path');
const { fork } = require('child_process');

Utilities.changeFileAttributeAtomic(process.env.CONFIG_PATH, 'running', false);
const results = {
    DCs: [],
    DHs: [],
    finalizedOffers: [],
    totalOffers: [],
    averageOfferPriceTRAC: [],
    averageOfferPriceCurrency: [],
    lambdaChangeDCs: [],
    minLambdaChangeDCs: [],
    maxLambdaChangeDCs: [],
    lambdaChangeDHs: [],
    minLambdaChangeDHs: [],
    maxLambdaChangeDHs: [],
    currentRiskRange: [],
    tokenValue: [],
};
const program = path.resolve('nodejs/modules/simulator/simulator-worker.js');
const child = fork(program);

child.on('message', (message) => {
    // console.log('message');
    Object.keys(results).forEach((key) => {
        results[key].push(message[key]);
    });
});

// function stopSimulatorProcess() {
//     if (child) {
//         child.kill('SIGKILL');
//         child = null;
//     }
//     results = {
//         DCs: [],
//         DHs: [],
//         finalizedOffers: [],
//         totalOffers: [],
//         averageOfferPriceTRAC: [],
//         averageOfferPriceCurrency: [],
//         lambdaChangeDCs: [],
//         minLambdaChangeDCs: [],
//         maxLambdaChangeDCs: [],
//         lambdaChangeDHs: [],
//         minLambdaChangeDHs: [],
//         maxLambdaChangeDHs: [],
//         tokenValue: [],
//     };
// }

function initializeAPI() {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.listen(3001, () => {
        console.log('Server running on port 3001');
    });

    app.get('/results', (req, res, next) => {
        const n = results.tokenValue.length;
        const response = {};

        Object.keys(results).forEach((key) => {
            response[key] = results[key].splice(0, n);
        });
        res.json(response);
    });

    app.get('/groups', (req, res, next) => {
        const response = Utilities.readFileAtomic(process.env.CONFIG_PATH);
        res.json(response);
    });

    app.post('/configuration/global', (req, res, next) => {
        Utilities.changeFileAttributeAtomic(process.env.CONFIG_PATH, 'tokenValue', req.body.tokenValue);
        Utilities.changeFileAttributeAtomic(process.env.CONFIG_PATH, 'tokenWindow', req.body.tokenWindow);
        res.json({ status: 'ok' });
    });

    app.post('/configuration/network', (req, res, next) => {
        const group = req.body;
        Utilities.changeFileGroupAtomic(process.env.CONFIG_PATH, group.id, group);
        res.json({ status: 'ok' });
    });

    app.delete('/configuration/network/:group_id', (req, res, next) => {
        const groupID = req.params.group_id;
        Utilities.removeFileGroupAtomic(process.env.CONFIG_PATH, groupID);
        res.json({ status: 'ok' });
    });

    app.get('/start', (req, res, next) => {
        Utilities.changeFileAttributeAtomic(process.env.CONFIG_PATH, 'running', true);
        res.json({ status: 'ok' });
    });

    app.get('/pause', (req, res, next) => {
        Utilities.changeFileAttributeAtomic(process.env.CONFIG_PATH, 'running', false);
        res.json({ status: 'ok' });
    });

    app.get('/stop', (req, res, next) => {
        Utilities.changeFileAttributeAtomic(process.env.CONFIG_PATH, 'running', false);
        Utilities.changeFileAttributeAtomic(process.env.CONFIG_PATH, 'restart', true);
        res.json({ status: 'ok' });
    });
    app.get('/save', (req, res, next) => {
        Utilities.changeFileAttributeAtomic(process.env.CONFIG_PATH, 'save', true);
        res.json({ status: 'ok' });
    });
}

process.once('SIGINT', () => {
    if (child) {
        child.kill('SIGKILL');
    }
});

initializeAPI();
