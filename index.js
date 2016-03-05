'use strict';
/**
 *
 *
 **/
const stringify = (text, { encoding = 'utf-8', response = 'string' } = {}) => {

    let result = [];

    if (!text) {
        return;
    }

    result.push(new Buffer(`${text.length}:`));
    result.push(new Buffer(text));
    result.push(new Buffer(','));

    result = Buffer.concat(result);

    if (response === 'string') {
        return result.toString();
    }
    return result;
};

export { stringify };
