const output = require('d3node-output')
const fs = require('fs')
const d3nMap = require('../')
const csvString = fs.readFileSync('./test/markers.csv').toString()
const markers = d3nMap.csvParse(csvString)

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

output(`./test/output`, d3nMap({ markers, radius, fill }))
