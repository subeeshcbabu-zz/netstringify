# netstringify
A module to generate and parse [netstring](https://en.wikipedia.org/wiki/Netstring) formats

## Install

```
    npm install netstringify
```

## Usage

### netstringify

Generate netstring format from normal text.

```javascript
    import netstringify from 'netstringify';

    let text = 'hello world!';
    let netstring = netstringify(text);
    //netstring will be '12:hello world!,'

    //Array of text:
    text = [ 'hello world!', 'Foo Bar Foobar!!!', 'hickery dickery dock'];
    netstring = netstringify(text);
    //netstring will be '12:hello world!,17:Foo Bar Foobar!!!,20:hickery dickery dock,'

```

### parse

Parse/convert a netstring format to normal text.

```javascript
    import { netstringify, parse } from 'netstringify';

    let text = 'hello world!';
    let netstring = netstringify(text);
    //netstring will be '12:hello world!,'
    let parsed = parse(netstring);
    //parsed will be 'hello world!'

    //Array of text:
    text = [ 'hello world!', 'Foo Bar Foobar!!!', 'hickery dickery dock'];
    netstring = netstringify(text);
    //netstring will be '12:hello world!,17:Foo Bar Foobar!!!,20:hickery dickery dock,'
    parsed = parse(netstring);
    //Parsed will be [ 'hello world!', 'Foo Bar Foobar!!!', 'hickery dickery dock']
```
