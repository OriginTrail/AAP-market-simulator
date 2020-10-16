const { plot, Plot, stack } = require('nodeplotlib');

const DC = require('./entities/dc');
const DH = require('./entities/dh');
const Offer = require('./entities/offer');
const Utilities = require('../utilities/utilities');

class Simulator {
    constructor() {
        this.DCs = [];
        this.DHs = [];
        this.historicalOffers = [];
        this.historicalTokenValue = [];
        this.currentOffers = [];
        this.groupIDs = [];
        this.groups = {};
    }

    updateState(data) {
        this.tokenValue = data.tokenValue;
        this.tokenWindow = data.tokenWindow;
        this.difficulty = data.difficulty;

        for (let i = 0; i < data.nodeGroups.length; i += 1) {
            const group = data.nodeGroups[i];
            if (group.name === '_static') {
                group.id = '_static';
            }
            if (!this.groupIDs.includes(group.id)) {
                this.addGroup(group);
            } else {
                this.updateGroup(group);
            }
        }

        const groupIDs = data.nodeGroups.map(x => x.id);
        for (let i = 0; i < this.groupIDs.length; i += 1) {
            const groupID = this.groupIDs[i];
            if (!groupIDs.includes(groupID)) {
                this.removeGroup(groupID);
            }
        }
    }

    addGroup(group) {
        if (group.type === 'DC') {
            for (let i = 0; i < group.number; i += 1) {
                this.DCs.push(new DC(
                    group.id,
                    group.number,
                    Utilities.getDistributionVariable(group.lambda),
                    Utilities.getDistributionVariable(group.maxLambda),
                    Utilities.getDistributionVariable(group.alpha),
                    Utilities.getDistributionVariable(group.riskRange),
                    Utilities.getDistributionVariable(group.offersProbability),
                ));
            }
        } else if (group.type === 'DH') {
            for (let i = 0; i < group.number; i += 1) {
                this.DHs.push(new DH(
                    group.id,
                    Utilities.getDistributionVariable(group.lambda),
                    Utilities.getDistributionVariable(group.minLambda),
                    Utilities.getDistributionVariable(group.refreshRate),
                    Utilities.getDistributionVariable(group.epsilon),
                ));
            }
        }
        this.groups[group.id] = group;
        this.groupIDs.push(group.id);
    }

    updateGroup(group) {
        const oldGroup = this.groups[group.id];

        if (JSON.stringify(group) === JSON.stringify(oldGroup)) {
            return;
        }

        const changes = {};
        Object.keys(group).forEach((key) => {
            if (!['id', 'name', 'type', 'number'].includes(key)) {
                if (JSON.stringify(group[key]) !== JSON.stringify(oldGroup[key])) {
                    if (key === 'riskRange') {
                        changes[key] = group.riskRange;
                    } else {
                        changes[key] = Utilities.getDistributionVariable(group[key]);
                    }
                }
            }
        });

        if (group.number > oldGroup.number) {
            if (group.type === 'DC') {
                const existingNodes = this.DCs.filter(x => x.groupID === group.id);
                for (let i = 0; i < existingNodes.length; i += 1) {
                    this.DCs[i].number = group.number;
                }
                for (let i = 0; i < Math.abs(group.number - oldGroup.number); i += 1) {
                    this.DCs.push(new DC(
                        group.id,
                        group.number,
                        Utilities.getDistributionVariable(group.lambda),
                        Utilities.getDistributionVariable(group.maxLambda),
                        Utilities.getDistributionVariable(group.alpha),
                        Utilities.getDistributionVariable(group.riskRange),
                        Utilities.getDistributionVariable(group.offersProbability),
                    ));
                }
            } else if (group.type === 'DH') {
                for (let i = 0; i < Math.abs(group.number - oldGroup.number); i += 1) {
                    this.DHs.push(new DH(
                        group.id,
                        Utilities.getDistributionVariable(group.lambda),
                        Utilities.getDistributionVariable(group.minLambda),
                        Utilities.getDistributionVariable(group.refreshRate),
                        Utilities.getDistributionVariable(group.epsilon),
                    ));
                }
            }
        } else if (group.number < oldGroup.number) {
            if (group.type === 'DC') {
                for (let i = 0; i < Math.abs(group.number - oldGroup.number); i += 1) {
                    this.DCs.splice(this.DCs.length * Math.random(), 1);
                }

                const existingNodes = this.DCs.filter(x => x.groupID === group.id);
                for (let i = 0; i < existingNodes.length; i += 1) {
                    this.DCs[i].number = group.number;
                }
            } else if (group.type === 'DH') {
                for (let i = 0; i < Math.abs(group.number - oldGroup.number); i += 1) {
                    this.DHs.splice(this.DCs.length * Math.random(), 1);
                }
            }
        }


        if (group.type === 'DC') {
            const existingNodes = this.DCs.filter(x => x.groupID === group.id);
            for (let i = 0; i < existingNodes.length; i += 1) {
                existingNodes[i].updateState(changes);
            }
        } else if (group.type === 'DH') {
            const existingNodes = this.DHs.filter(x => x.groupID === group.id);
            for (let i = 0; i < existingNodes.length; i += 1) {
                existingNodes[i].updateState(changes);
            }
        }


        this.groups[group.id] = group;
    }

    removeGroup(id) {
        for (let i = 0; i < this.DCs.length; i += 1) {
            if (this.DCs[i].groupID === id) {
                this.DCs.splice(i, 1);
                i -= 1;
            }
        }

        for (let i = 0; i < this.DHs.length; i += 1) {
            if (this.DHs[i].groupID === id) {
                this.DHs.splice(i, 1);
                i -= 1;
            }
        }

        delete this.groups[id];
        this.groupIDs.splice(this.groupIDs.indexOf(id), 1);
    }

    getAverageTokenValue() {
        let i;
        let total;
        if (this.historicalTokenValue.length <= this.tokenWindow) {
            i = 0;
            total = this.historicalTokenValue.length;
        } else {
            i = this.historicalTokenValue.length - this.tokenWindow;
            total = this.tokenWindow;
        }

        let avgTokenValue = 0;
        for (; i < this.historicalTokenValue.length; i += 1) {
            avgTokenValue += this.historicalTokenValue[i];
        }
        avgTokenValue /= total;
        return avgTokenValue;
    }

    publishOffers() {
        for (let i = 0; i < this.DCs.length; i += 1) {
            const offers = this.DCs[i].publishOffer(this.getAverageTokenValue());
            if (offers.length > 0) {
                this.currentOffers = this.currentOffers.concat(offers);
            }
        }
    }

    bidOffers() {
        for (let i = 0; i < this.currentOffers.length; i += 1) {
            this.currentOffers[i].setTotalBidders(this.DHs.length);
            for (let j = 0; j < this.DHs.length; j += 1) {
                this.DHs[j].bid(this.currentOffers[i], this.getAverageTokenValue());
            }
        }
    }

    finalizeOffers() {
        let finalized = 0;
        for (let i = 0; i < this.currentOffers.length; i += 1) {
            if (this.currentOffers[i].finalize(this.difficulty)) {
                finalized += 1;
            }
        }

        return finalized;
    }

    updateDCs() {
        let lambdaChange = 0;
        let minLambdaChange = +Infinity;
        let maxLambdaChange = -Infinity;
        let riskRange = 0;
        for (let i = 0; i < this.DCs.length; i += 1) {
            const lambda = this.DCs[i].update(this.difficulty);
            if (minLambdaChange > lambda) {
                minLambdaChange = lambda;
            }
            if (maxLambdaChange < lambda) {
                maxLambdaChange = lambda;
            }
            lambdaChange += lambda;

            riskRange += this.DCs[i].targetNodes;
        }

        riskRange /= this.DCs.length;
        console.log(riskRange);

        return {
            lambdaChangeDCs: lambdaChange / this.DCs.length,
            minLambdaChangeDCs: minLambdaChange,
            maxLambdaChangeDCs: maxLambdaChange,
        };
    }

    updateDHs() {
        let lambdaChange = 0;
        let minLambdaChange = +Infinity;
        let maxLambdaChange = -Infinity;
        let epsilon = 0;
        for (let i = 0; i < this.DHs.length; i += 1) {
            const lambda = this.DHs[i].update();
            if (minLambdaChange > lambda) {
                minLambdaChange = lambda;
            }
            if (maxLambdaChange < lambda) {
                maxLambdaChange = lambda;
            }
            lambdaChange += lambda;

            epsilon += this.DHs[i].epsilon;
        }

        epsilon /= this.DHs.length;

        return {
            lambdaChangeDHs: lambdaChange / this.DHs.length,
            minLambdaChangeDHs: minLambdaChange,
            maxLambdaChangeDHs: maxLambdaChange,
        };
    }

    getStats() {
        let equilibriumSum = 0;
        let currentRiskRangeSum = 0;
        for (let i = 0; i < this.DCs.length; i += 1) {
            equilibriumSum += this.DCs[i].inEquilibrium === true ? 1 : 0;
            currentRiskRangeSum += this.DCs[i].currentRiskRange;
        }

        return { currentRiskRange: currentRiskRangeSum / this.DCs.length };
    }

    runIteration() {
        this.historicalTokenValue.push(this.tokenValue);

        this.publishOffers();
        this.bidOffers();
        const finalizedOffers = this.finalizeOffers();
        const totalOffers = this.currentOffers.length;

        const { lambdaChangeDCs, minLambdaChangeDCs, maxLambdaChangeDCs } = this.updateDCs();
        const { lambdaChangeDHs, minLambdaChangeDHs, maxLambdaChangeDHs } = this.updateDHs();
        const { currentRiskRange } = this.getStats();

        let averageOfferPriceTRAC = 0;
        let averageOfferPriceCurrency = 0;
        for (let i = 0; i < this.currentOffers.length; i += 1) {
            averageOfferPriceTRAC += this.currentOffers[i].price;
            averageOfferPriceCurrency += this.currentOffers[i].price * this.tokenValue;
        }
        averageOfferPriceTRAC /= this.currentOffers.length;
        averageOfferPriceCurrency /= this.currentOffers.length;

        const result = {
            tokenValue: this.tokenValue,
            DCs: this.DCs.length,
            DHs: this.DHs.length,
            finalizedOffers,
            totalOffers,
            averageOfferPriceTRAC,
            averageOfferPriceCurrency,
            lambdaChangeDCs,
            minLambdaChangeDCs,
            maxLambdaChangeDCs,
            lambdaChangeDHs,
            minLambdaChangeDHs,
            maxLambdaChangeDHs,
            currentRiskRange,
        };

        this.historicalOffers = this.historicalOffers.concat(this.currentOffers);
        this.currentOffers = [];
        if (this.historicalOffers.length > 10000) {
            this.historicalOffers.shift();
            this.historicalTokenValue.shift();
        }

        return result;
    }
}

module.exports = Simulator;
