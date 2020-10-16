const Probability = require('probability-node');
const Utilities = require('../../utilities/utilities');

class Offer {
    constructor(price, tokenValue) {
        this.price = price;
        this.bidders = 0;
        this.finalized = false;
        this.tokenValue = tokenValue;
    }

    setTotalBidders(totalBidders) {
        this.totalBidders = totalBidders;
    }

    finalize(difficulty) {
        const p = this.getProbability(difficulty);
        if (Utilities.probability(p)) { this.finalized = true; }

        return this.finalized;
    }

    getProbability(difficulty) {
        const p = 1 - (((((16 ** difficulty) - 1) / (16 ** difficulty)) ** (65 - difficulty)) ** ((this.bidders * (this.bidders - 1) * (this.bidders - 2))));
        return p;
    }
}

module.exports = Offer;
