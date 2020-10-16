const lockFile = require('lockfile');
const fs = require('fs');


class Utilities {
    static gaussian(mean, stdev) {
        var y2;
        var use_last = false;
        return function () {
            var y1;
            if (use_last) {
                y1 = y2;
                use_last = false;
            } else {
                var x1,
                    x2,
                    w;
                do {
                    x1 = 2.0 * Math.random() - 1.0;
                    x2 = 2.0 * Math.random() - 1.0;
                    w = x1 * x1 + x2 * x2;
                } while (w >= 1.0);
                w = Math.sqrt((-2.0 * Math.log(w)) / w);
                y1 = x1 * w;
                y2 = x2 * w;
                use_last = true;
            }

            var retval = mean + stdev * y1;
            if (retval > 0) { return retval; }
            return -retval;
        };
    }

    static getDistributionVariable(options) {
        const { mean, variance, distribution } = options;
        if (distribution === 'gaussian') {
            var standard = this.gaussian(mean, variance);
            return standard();
        } else if (distribution === 'random') {
            const max = mean + variance;
            const min = mean - variance;
            return (Math.random() * ((max - min))) + min;
        }
    }


    static getTokenValue() {
        if (!Utilities.tokenValue) { Utilities.tokenValue = 5; }
        return Utilities.tokenValue;
    }

    static getTokenValueUpdate() {
        if (!Utilities.tokenValueChange) { Utilities.tokenValueChange = 0; }
        return Utilities.tokenValueChange;
    }

    static setTokenValueUpdate(tokenValueChange) {
        Utilities.tokenValueChange = tokenValueChange;
    }

    static getTokenValueChange(i) {
        if (i === 0) { return 0; }
        return Utilities.tokenValueArray[i] - Utilities.tokenValueArray[i - 1];
    }

    static getAvgTokenValue(range) {
        const arrayAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
        if (Utilities.tokenValueArray.length < range) {
            return arrayAvg(Utilities.tokenValueArray);
        }
        return arrayAvg(Utilities.tokenValueArray.slice(-range));
    }

    static setTokenValue(tokenValue) {
        if (!Utilities.tokenValueArray) { Utilities.tokenValueArray = []; }
        Utilities.tokenValue = tokenValue;

        Utilities.tokenValueArray.push(tokenValue);
    }

    static getTotalBidders() {
        return Utilities.totalBidders;
    }
    static setTotalBidders(totalBidders) {
        Utilities.totalBidders = totalBidders;
    }

    static probability(n) {
        return !!n && Math.random() <= n;
    }

    static lockFile(path) {
        lockFile.lockSync(path);
    }

    static unlockFile(path) {
        lockFile.unlockSync(path);
    }

    static readFileAtomic(path) {
        const lockFilePath = `${path.split('.').slice(0, -1).join('.')}.lock`;
        let data;
        let successful = false;

        while (!successful) {
            try {
                Utilities.lockFile(lockFilePath);
                data = JSON.parse(fs.readFileSync(path).toString());
                Utilities.unlockFile(lockFilePath);
                successful = true;
            } catch (e) {
                successful = false;
            }
        }

        return { data, successful: true };
    }

    static changeFileAttributeAtomic(path, key, value, groupID) {
        const lockFilePath = `${path.split('.').slice(0, -1).join('.')}.lock`;
        let successful = false;

        while (!successful) {
            try {
                Utilities.lockFile(lockFilePath);
                const config = JSON.parse(fs.readFileSync(path).toString());
                if (!groupID) {
                    config[key] = value;
                } else {
                    for (let i = 0; i < config.nodeGroups.length; i += 1) {
                        const group = config.nodeGroups[i];
                        if (group.id === groupID) {
                            group[key] = value;
                            break;
                        }
                    }
                }
                fs.writeFileSync(path, JSON.stringify(config));
                Utilities.unlockFile(lockFilePath);
                successful = true;
            } catch (e) {
                successful = false;
            }
        }
    }

    static changeFileGroupAtomic(path, groupID, data) {
        const lockFilePath = `${path.split('.').slice(0, -1).join('.')}.lock`;
        let successful = false;

        while (!successful) {
            try {
                Utilities.lockFile(lockFilePath);
                const config = JSON.parse(fs.readFileSync(path).toString());
                let found = false;
                for (let i = 0; i < config.nodeGroups.length; i += 1) {
                    if (config.nodeGroups[i].id === groupID) {
                        config.nodeGroups[i] = data;
                        found = true;
                        break;
                    }
                }

                if (!found) { config.nodeGroups.push(data); }
                fs.writeFileSync(path, JSON.stringify(config));
                Utilities.unlockFile(lockFilePath);
                successful = true;
            } catch (e) {
                successful = false;
            }
        }
    }

    static removeFileGroupAtomic(path, groupID) {
        const lockFilePath = `${path.split('.').slice(0, -1).join('.')}.lock`;
        let successful = false;

        while (!successful) {
            try {
                Utilities.lockFile(lockFilePath);
                const config = JSON.parse(fs.readFileSync(path).toString());
                for (let i = 0; i < config.nodeGroups.length; i += 1) {
                    if (config.nodeGroups[i].id === groupID) {
                        config.nodeGroups.splice(i, 1);
                        break;
                    }
                }
                fs.writeFileSync(path, JSON.stringify(config));
                Utilities.unlockFile(lockFilePath);
                successful = true;
            } catch (e) {
                successful = false;
            }
        }
    }
}

module.exports = Utilities;