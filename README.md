# Price compensation mechanism simulator

The goal of this project is to validate proposed solution for price compensation in the ODN decentralized network. 
Proposed solution presents configurable node plugin component which will automatically calculate the optimal λ on the network based on the node configuration in the ODN decentralized network.

Company Website: https://tracelabs.io

## Installation
Instructions for installation and configuration of the simulator

```javascript
git clone https://github.com/OriginTrail/lambda-simulator-private.git
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
