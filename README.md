# Price compensation mechanism simulator

The goal of this project is to validate proposed solution for price compensation in the ODN decentralized network. 
Proposed solution presents configurable node plugin component which will automatically calculate the optimal λ on the network based on the node configuration in the ODN decentralized network.

Company Website: https://tracelabs.io

## Installation
Instructions for installation and configuration of the simulator

```javascript
git clone https://github.com/OriginTrail/AAP-market-simulator.git
```

Run backend simulator
```javascript
cd nodejs && npm install
node index.js
```

Run frontend interface
```javascript
cd react/simulator && npm install
npm start
```

Env example:
```javascript
CONFIG_PATH = nodejs/config/config.json
```

In order to create a snapshot of a simulation, click on the “Save” link at the bottom left of the simulator. Graph images are saved in the downloads directory while simulation snapshots are located in snapshots directory, which is located in the root directory of the project.

The detailed specification behind the AAP plugin which this simulator was designed for is at [URL].

### Requirements

* node version: 9.11.2
* npm version: 5.6.0