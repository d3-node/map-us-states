## Map of US States :earth_americas:

geocoded markers (via CSV) with radius representing a datapoint

![map](./test/output.png)

## Install
```bash
$ npm install @d3-node/map-us-states --save
```

## Usage

```js
const d3nMap = require('@d3-node/map-us-states')

// read CSV -> parse to json
const csv = fs.readFileSync('./markers.csv').toString()
const markers = d3nMap.csvParse(csv)

// calculate size of circle
const radius = function (d) {
  return d.POP_2010 / 150000
}

const map = d3nMap({ markers, radius })
map.svgString() // returns <svg>
```

See [test](./test/index.js) for actual usage.

##### Output the test map to an image (PNG)
```
npm test
```

## API

#### Options 
`{ markers, [ radius, fill, styles ] }`
