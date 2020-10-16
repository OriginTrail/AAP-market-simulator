require('dotenv').config();

const Simulator = require('./simulator');
const Utilities = require('../utilities/utilities');
const sleep = require('sleep');
const fs = require('fs');

let snapshots = {};
let simulator = new Simulator();
let i = 0;
while (true) {
    let currentState = Utilities.readFileAtomic(process.env.CONFIG_PATH);
    if (currentState.restart) {
        Utilities.changeFileAttributeAtomic(process.env.CONFIG_PATH, 'restart', false);
        simulator = new Simulator();
        snapshots = [];
        i = 0;
    }
    if (currentState.data.save) {
        Utilities.changeFileAttributeAtomic(process.env.CONFIG_PATH, 'save', false);
        fs.writeFileSync(`snapshots/${new Date().toISOString()}.json`, JSON.stringify(snapshots));
    }
    while (currentState.data.running) {
        if (currentState.data.save) {
            Utilities.changeFileAttributeAtomic(process.env.CONFIG_PATH, 'save', false);
            fs.writeFileSync(`snapshots/${new Date().toISOString()}.json`, JSON.stringify(snapshots));
        }
        if (i === 0) {
            snapshots[i] = currentState.data;
        }
        simulator.updateState(currentState.data);
        const results = simulator.runIteration();
        process.send(results);
        i += 1;

        const newState = Utilities.readFileAtomic(process.env.CONFIG_PATH);
        if (newState.successful) {
            if (JSON.stringify(currentState) !== JSON.stringify(newState)) { snapshots[i] = newState.data; }
            currentState = newState;
        }

        sleep.msleep(100);
    }
    sleep.msleep(100);
}
