const Offer = require('./offer');
const Utilities = require('../../utilities/utilities');

class DC {
    constructor(groupID, number, lambda, maxLambda, alpha, riskRange, offersProbability) {
        this.groupID = groupID;
        this.number = number;
        this.lambda = lambda;
        this.maxLambda = maxLambda;
        this.alpha = alpha;
        this.riskRange = riskRange;
        this.offersProbability = offersProbability;
        this.offers = [];
        this.inEquilibrium = false;
        this.currentRiskRange = 0;
        this.targetNodes = 0;
        this.minBoundary = 0;
        this.maxBoundary = 0;
        this.difficulty = 0;
    }

    updateState(changes) {
        Object.keys(changes).forEach((key) => {
            this[key] = changes[key];
        });
    }

    publishOffer(tokenValue) {
        this.offers = [];
        let p = this.offersProbability / this.number;
        while (p > 1) {
            this.offers.push(new Offer(this.lambda / tokenValue, tokenValue));
            p -= 1;
        }
        if (Utilities.probability(p)) {
            this.offers.push(new Offer(this.lambda / tokenValue, tokenValue));
        }

        return this.offers;
    }

    update(difficulty) {
        if (this.difficulty !== difficulty) {
            if (difficulty === 6) {
                this.targetNodes = 200;
                this.offset = this.targetNodes - (this.targetNodes * (this.riskRange / 100));
                this.minBoundary = this.targetNodes - this.offset;
                this.maxBoundary = this.targetNodes + this.offset;
            } else if (difficulty === 7) {
                this.targetNodes = 500;
                this.offset = this.targetNodes - (this.targetNodes * (this.riskRange / 100));
                this.minBoundary = this.targetNodes - this.offset;
                this.maxBoundary = this.targetNodes + this.offset;
            }
        }


        for (let i = 0; i < this.offers.length; i += 1) {
            const target = this.targetNodes / this.offers[i].totalBidders;
            const p = this.offers[i].bidders / this.offers[i].totalBidders;
            this.currentRiskRange = p;
            this.inEquilibrium = p === target;

            let change = this.alpha * (target - p);

            if (this.lambda + change >= this.maxLambda) {
                change = this.lambda - this.maxLambda;
            }

            this.lambda += change;

            const ratio = 2 * ((this.lambda - (this.lambda - change)) / (this.lambda - change));

            if ((this.targetNodes + (this.targetNodes * ratio)) >= this.minBoundary && (this.targetNodes + (this.targetNodes * ratio)) < this.maxBoundary) {
                this.targetNodes += this.targetNodes * ratio;
            } else if ((this.targetNodes + (this.targetNodes * ratio)) < this.minBoundary) {
                this.targetNodes = this.minBoundary;
            } else {
                this.targetNodes = this.maxBoundary;
            }
        }

        return this.lambda;
    }
}

module.exports = DC;
