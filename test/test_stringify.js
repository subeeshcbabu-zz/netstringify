'use strict';

import assert from 'assert';
import { stringify } from '../index'

describe('stringify', () => {
    const input = 'hello world!';
    const output = '12:hello world!,';

    it('should return netstring', () => {
        assert.strictEqual(stringify(input), output, 'OK netstring');

    });
});
