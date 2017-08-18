const topojson = require('topojson')
const topoJson = require('./us-states.json')
const D3Node = require('d3-node')
const d3 = D3Node.d3

const defaultStyles = `
    .states { pointer-events: none; fill: #ccc; stroke: #fff; stroke-width: 1px; stroke-linejoin: round;}
`

const defaultRadius = function (d) {
  return d.POP_2010 / 150000
}

const defaultFill = function (d) {
  const colorScale = d3.scaleThreshold()
    .domain([1, 4, 8, 15, 20, 30, 40, 50, 60])
    .range([
      'rgb(255,245,240)', 'rgb(254,224,210)', 'rgb(252,187,161)',
      'rgb(252,146,114)', 'rgb(251,106,74)', 'rgb(239,59,44)',
      'rgb(203,24,29)', 'rgb(165,15,21)', 'rgb(103,0,13)'
    ])

  return colorScale(d.POP_2010 / 150000)
}

function statesMap ({ markers, radius = defaultRadius, fill = defaultFill, styles = defaultStyles } = {}) {
  const d3n = new D3Node({ styles })
  const projection = d3.geoAlbersUsa()
  const path = d3.geoPath().projection(projection)

  const rows = markers.filter(function (d) { return projection([d.longitude, d.latitude]) })

  const svg = d3n.createSVG(960, 500)

  svg.selectAll('.states')
    .data(topojson.feature(topoJson, topoJson.objects.states).features)
    .enter()
    .append('path')
    .attr('class', 'states')
    .attr('d', path)

  const circleGroup = svg.selectAll('circle')
    .data(rows)
    .enter()
    .append('g')
    .attr('transform', function (d) {
      const coords = projection([ d.longitude, d.latitude ])
      return `translate(${coords})`
    })
    .attr('class', 'map-point')

  circleGroup
    .append('circle')
    .style('fill', fill)
    .style('stroke', 'grey')
    .style('fill-opacity', 0.8)
    .attr('r', radius)

  return d3n
}

module.exports = statesMap
module.exports.dsvFormat = d3.dsvFormat
module.exports.csvParse = d3.csvParse
