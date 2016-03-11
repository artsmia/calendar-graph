module.exports = function(d, excludeDate) {
  var excludeDate = (typeof excludeDate == 'undefined') ? false : excludeDate

  var dateFrom = new Date(d.dateFrom*1000)
    , dateTo = new Date(d.dateTo*1000)
    , dates = (d.dateFrom === d.dateTo ? [dateFrom] : [dateFrom, dateTo])
    , dateString = dates.map(function(date) {
      return date.toLocaleString().split(" ")[0]
    }).join(" — ")
    , relativeTime = Date.create(d.timeFrom).relative()

  if(d.title.match("State of the Art:")) {
    d.typeName = "Tour meets in Gallery 230"
  }
  if(d.title.match("Winterlights at the Purcell-Cutts House")) {
    d.typeName = "Tickets required, meet at 3rd Av entrance 20 minutes early"
  }

  return "<h3><a href='"+d.permalink+"'>"+d.title+"</a></h3>" +
    "<p><strong>"+d.typeName+"</strong> <span class='circ'><span class='time'>"+d.timeFrom+" "+(excludeDate ? '' : dateString)+"</span></span></p>" +
    "<div class='line'></div><div class='starts'>"+relativeTime+"</div>"
}
