# Automatic Adjustment Plugin (AAP) simulator

The Automatic Adjustment Plugin (AAP) simulator is used to validate the proposed solution outlined in [OT-RFC-06](https://github.com/OriginTrail/OT-RFC-repository/blob/main/RFCs/OT-RFC-06%20OriginTrail%20utility%20market%20automatic%20adjustment%20plugin.pdf).
AAP is a configurable OriginTrail node plugin which will attempt to automatically calculate the optimal price (λ setting) on the network based on the service market of the ODN decentralized network.

The simulator let's you create groups of DC and DH nodes with different settings and observe market equilibrium behavior. 

The detailed specification behind the AAP plugin which this simulator was designed for is [here](https://github.com/OriginTrail/OT-RFC-repository/blob/main/RFCs/OT-RFC-06%20OriginTrail%20utility%20market%20automatic%20adjustment%20plugin.pdf).

## Simulation snapshots

Each simulation can be saved for later inspectin. In order to create a snapshot of a simulation, click on the “Save” link at the bottom left of the simulator. Graph images are saved in the downloads directory while simulation snapshots are located in snapshots directory, which is located in the root directory of the project.


## Installation
Instructions for installation and configuration of the simulator

```javascript
git clone https://github.com/OriginTrail/AAP-market-simulator.git
```

Run backend simulator
```javascript
cd nodejs && npm install && cd ..
node nodejs/index.js
```

Run frontend interface
```javascript
cd react/simulator && npm install && cd ../..
npm start --prefix react/simulator
```

Env example:
```javascript
CONFIG_PATH = nodejs/config/config.json
```

### Requirements

* nodejs version: 9.11.2
* npm version: 5.6.0


## Contribute

Apart from running simulations you can also directly contribute to this project. 
Please follow the [contribution guidelines](https://docs.origintrail.io/en/latest/contribution-guidelines.html)

### Useful links


[OriginTrail website](https://origintrail.io)

[OriginTrail documentation page](http://docs.origintrail.io)

[OriginTrail Discord Group](https://discordapp.com/invite/FCgYk2S)

[OriginTrail Telegram Group](https://t.me/origintrail)

[OriginTrail Twitter](https://twitter.com/origin_trail)

