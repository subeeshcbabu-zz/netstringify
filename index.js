'use strict';
/**
 *
 *
 **/
const stringify = (text, { encoding = 'utf-8', response = 'string' } = {}) => {
    let textBuff;
    let lenBuff;
    let endBuff;
    let result;

    if (!text) {
        return;
    }

    textBuff = new Buffer(text);
    lenBuff = new Buffer(`${text.length}:`);
    endBuff = new Buffer(',');

    result = Buffer.concat(lenBuff, textBuff, endBuff);

    if (response === 'string') {
        return result.toString();
    }
    return result;
}
