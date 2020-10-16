
const Utilities = require('../../utilities/utilities');

class DH {
    constructor(groupID, lambda, minLambda, refreshRate, epsilon) {
        this.groupID = groupID;
        this.lambda = lambda;
        this.minLambda = minLambda;
        this.refreshRate = refreshRate;
        this.counter = 0;
        this.epsilon = epsilon;
        this.minEpsilon = epsilon;
        this.offers = [];
        this.myOffers = 0;
        this.alpha = 1;
    }

    updateState(changes) {
        Object.keys(changes).forEach((key) => {
            this[key] = changes[key];
        });
    }

    updateLambda() {
        const target = this.epsilon / 100;
        const p = this.myOffers / this.offers.length;

        // todo method algortihm for epsilon update
        // const epsilonChange = this.epsilonAlpha * 1 * 10 * (p - target);

        // if (this.epsilon + epsilonChange > 100) {
        //     this.epsilon = 100;
        // } else if (this.epsilon - epsilonChange < 0) {
        //     this.epsilon = 0;
        // } else {
        //     this.epsilon += epsilonChange;
        // }

        let change = this.alpha * (p - target);

        if (this.minLambda >= this.lambda + change) {
            change = this.lambda - this.minLambda;
        }

        this.lambda += change;

        const ratio = (this.lambda - (this.lambda - change)) / (this.lambda - change);

        // todo epsilon range
        // if (this.epsilon + (this.epsilon * ratio) <= this.minEpsilon) {
        // this.epsilon = this.minEpsilon;
        // } else {
        this.epsilon += this.epsilon * ratio;
        // }
    }

    bid(offer, tokenValue) {
        const minPrice = this.lambda / tokenValue;
        if (offer.price >= minPrice) { // && offer.price <= maxPrice
            offer.bidders += 1;
            this.myOffers += 1;
        }

        if (offer.price > this.minLambda / tokenValue) { this.offers.push(offer); }
    }

    update() {
        this.counter += 1;
        if (this.counter >= this.refreshRate) {
            if (this.groupID !== '_static') { this.updateLambda(); }
            this.counter = 0;
            this.myOffers = 0;
            this.previousOffers = this.offers;
            this.offers = [];
        }
        return this.lambda;
    }
}

module.exports = DH;