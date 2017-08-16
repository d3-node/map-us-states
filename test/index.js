const output = require('d3node-output')
const fs = require('fs')
const geoCSV = fs.readFileSync('./test/locations.csv').toString()
const map = require('../')

const radius = function (d) {
  return d.POP_2010 / 150000
}

output(`./test/output`, map({ geoCSV, radius }))
