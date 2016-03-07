'use strict';

import assert from 'assert';
import { stringify } from '../index'
import path from 'path';

describe('stringify', () => {
    const input = 'hello world!';
    const expected = '12:hello world!,';
    var result;

    it('should return netstring', () => {
        result = stringify(input);
        assert.ok(result && result.length > 0, 'OK result');
        result.forEach((value) => {
            assert.strictEqual(value, expected, 'OK netstring');
        })
    });

    it('should return netstrings', () => {
        var inputs = [];
        inputs.push(input);
        inputs.push(input);
        inputs.push(input);

        inputs = inputs.join(path.delimiter);
        result = stringify(inputs);
        assert.ok(result && result.length > 0, 'OK result');

        result.forEach((value) => {
            assert.strictEqual(value, expected, 'OK netstring');
        })

    });
});
