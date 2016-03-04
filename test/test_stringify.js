'use strict';

import assert from 'assert';
import netstring from '../index'

describe('stringify', () => {
    const input = 'hello world!';
    const output = '12:hello world!,';

    it('should return netstring', () => {

        assert.strictEqual(netstring.stringify(input), output, 'OK netstring');

    });
});
