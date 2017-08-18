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

// optional marker radius calculation
const radius = function (d) {
  return d.POP_2010 / 150000
}

// optional marker color fill 
const fill = function (d) {
  const colorScale = d3nMap.scaleThreshold()
    .domain([1, 15, 20, 60])
    .range(['rgb(255,245,240)', 'rgb(252,146,114)', 'rgb(203,24,29)', 'rgb(103,0,13)'])
  return colorScale(d.POP_2010 / 150000)
}

const map = d3nMap({ markers, radius, fill })
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
