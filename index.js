'use strict';

import path from 'path';
/**
 *
 *
 **/
const NETSTRING_DELIMITER = ',';
const NETSTRING_SEPARATOR = ':';

const stringify = (input, { encoding = 'utf-8', response = 'string', delimiter = path.delimiter } = {}) => {

    let result = [];

    if (!input) {
        return;
    }

    input.split(delimiter).forEach((text) => {
        let netstring = [];
        netstring.push(new Buffer(`${text.length}${NETSTRING_SEPARATOR}`, encoding));
        netstring.push(new Buffer(text, encoding));
        netstring.push(new Buffer(NETSTRING_DELIMITER, encoding));
        netstring = Buffer.concat(netstring);
        result.push((response === 'string') ? netstring.toString() : netstring);
    });

    return result;
};

const parse = (netstring, { encoding = 'utf-8', response = 'string' } = {}) => {
    if (!netstring) {
        return;
    }
};

export { stringify };
