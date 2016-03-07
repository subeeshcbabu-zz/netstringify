'use strict';

import path from 'path';

const NETSTRING_DELIMITER = ',';
const NETSTRING_SEPARATOR = ':';
const NETSTRING_SEPARATOR_CODE = 58;
/**
 * string ---> netstring
 * 'hello world!' ---> '12:hello world!,'
 *
 * Array of strings ---> netstring
 * [ 'hello world!', 'hello world!'] ---> '12:hello world!,12:hello world!,'
 **/
const netstringify = (string, { encoding = 'utf-8', response = 'string' } = {}) => {

    let result = [];
    let input = [];

    if (!input) {
        return;
    }

    if (!Array.isArray(string)) {
        input.push(string);
    } else {
        input = string;
    }

    input.forEach((text) => {
        let netstring = [];
        netstring.push(new Buffer(`${text.length}${NETSTRING_SEPARATOR}`, encoding));
        netstring.push(new Buffer(text, encoding));
        netstring.push(new Buffer(NETSTRING_DELIMITER, encoding));
        netstring = Buffer.concat(netstring);
        result.push(netstring);
    });
    //For string result
    if (result.length > 0 && response === 'string') {
        result = result.map(netstring => netstring.toString(encoding));
        return result.join('');
    }
    //Return as buffer for all the other types.
    return Buffer.concat(result);
};

const parse = (netstring, { encoding = 'utf-8', response = 'string' } = {}) => {
    let result = [];
    if (!netstring) {
        return;
    }
    netstring = new Buffer(netstring, encoding);

    for (let i = 0, val, lenStart = 0, len, stringStart, string; i < netstring.length ; i++) {

        val = netstring[i];
        //First find the ':' - NETSTRING_SEPARATOR character.
        if (NETSTRING_SEPARATOR_CODE === val) {
            //Find the length digits on the left side of NETSTRING_SEPARATOR(:)
            len = netstring.toString(encoding, lenStart, i);
            len = Number.parseInt(len);
            //Find the string based on the length value and slice the string.
            stringStart = i + 1;
            string = netstring.slice(stringStart, stringStart + len);
            result.push((response === 'string') ? string.toString(encoding): string);
            //Reset index to next string.
            i = stringStart + len + 1;
            lenStart = i;
        }
    }
    return result;
};

export { netstringify, parse };
