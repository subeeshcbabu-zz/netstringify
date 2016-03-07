'use strict';

import assert from 'assert';
import { netstringify, parse } from '../index'
import path from 'path';

describe('stringify', () => {
    const input = 'hello world!';
    const expected = '12:hello world!,';
    var result;
    var inputs = [];
    var expecteds = [];

    for (var i = 0; i < 3; i++) {
        inputs.push(input);
        expecteds.push(expected);
    }

    it('should return netstring', () => {
        result = netstringify(input);
        assert.strictEqual(result, expected, 'OK netstring');
    });

    it('should return netstring buffer', () => {
        result = netstringify(input, {
            response : 'buffer'
        });
        assert.ok(Buffer.compare(result, new Buffer(expected)) === 0, 'OK netstring buffer');
    });

    it('should return netstrings', () => {
        result = netstringify(inputs);
        assert.strictEqual(result, expecteds.join(''), 'OK netstring');
    });

    it('should return netstrings buffer', () => {

        var expectedBuff = expecteds.map(netstring => new Buffer(netstring));
        expectedBuff = Buffer.concat(expectedBuff);

        result = netstringify(inputs, {
            response : 'buffer'
        });
        assert.ok(Buffer.compare(result, expectedBuff) === 0, 'OK netstrings buffer');
    });

    it('should parse netstring', () => {
        result = parse(netstringify(input));
        assert.ok(result && result.length > 0, 'OK result');
        result.forEach((value) => {
             assert.strictEqual(value, input, 'OK parsed value');
        });
    });

    it('should parse netstring array', () => {
        result = parse(netstringify(inputs));
        assert.ok(result && result.length > 0, 'OK result');
        result.forEach((value) => {
             assert.strictEqual(value, input, 'OK parsed value');
        });
    });

    it('should parse netstring to buffer result', () => {
        result = parse(netstringify(input), {
            response : 'buffer'
        });
        assert.ok(result && result.length > 0, 'OK result');
        result.forEach((value) => {
             assert.ok(Buffer.compare(value, new Buffer(input)) === 0, 'OK netstrings buffer');
        });
    });

    it('should parse netstring array to buffer result', () => {
        result = parse(netstringify(inputs), {
            response : 'buffer'
        });
        assert.ok(result && result.length > 0, 'OK result');
        result.forEach((value) => {
             assert.ok(Buffer.compare(value, new Buffer(input)) === 0, 'OK netstrings buffer');
        });
    });
});
