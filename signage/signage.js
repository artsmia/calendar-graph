require('sugar') // `Date.create('5pm')`
var today = require('../today')
var d3 = window.d3 = require('d3')
var date = window.location.hash.match(/20\d\d/) ? new Date(window.location.hash) : new Date()

var list = d3.select("body").append("ul"),
    _today = today(date),
    events = _today(false),
    pastEvents = _today.earlier(events)
    eventHtml = require('../eventHtml'),
    bed = d3.select("body").append("div"),
    images = [
      {url: './wells/mia_44644a-2.jpg', id: 'two'},
      {url: './wells/mia_44638a.jpg', id: 'one'}
    ]

list.attr("id", "pulse")
window.bed = bed
bed.attr("id", "bed")
var images = bed.selectAll("div")
    .data(images)
    .enter()
    .append('div')
    .attr("id", function(d) { return d.id })
    .style('background-image', function(d) {
      return "url("+d.url+")"
    })

function update(events) {
  var events = list.selectAll("li")
      .data(events, function(d) { return d.title + d.timeFrom + d.timeTo })

  events.enter().append("li")

  events
      .html(function(d) {
        return eventHtml(d, true)
      })
      .classed("now", function(d) { return d.now })
      .classed("future", function(d) { return d.future })
      .classed("past", function(d) { return d.past })
      .classed("clearfix", true)
      .attr('class', function(d) {
        this.classList.add(d.typeCategory)
        return this.classList.toString()
      })

  events.exit().remove()
}

update(events)
if(window.location.hash != '#all') {
  var updateLoop = setInterval(function() {
    // update events to only include upcoming
    var pnf = _today.pastNowFuture()
    pnf.now.forEach(function(e) { e.now = true })
    pnf.future.forEach(function(e) { e.future = true })
    pnf.past.forEach(function(e) { e.past = true })

    events = pnf.past.last(3).concat(pnf.now).concat(pnf.future)
    list.classed('few', function() { return events.length < 7 })
    update(events)
    if(window.location.hash == '#freeze') return clearInterval(updateLoop)
  }, 10000)
}

if((new Date).getDay() == 1) {
  d3.select("body").append("aside")
    .html("(We're closed)")
    .attr('id', 'closed')
}

