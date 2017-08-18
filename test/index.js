const output = require('d3node-output')
const fs = require('fs')
const map = require('../')
const csvString = fs.readFileSync('./test/markers.csv').toString()
const markers = map.csvParse(csvString)

const radius = function (d) {
  return d.POP_2010 / 150000
}

output(`./test/output`, map({ markers, radius }))
