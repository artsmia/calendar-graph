var cal = require('./events')

module.exports = function eventsToday(date, includeMultiday) {
  var date = date || new Date,
      includeMultiday = (typeof includeMultiday != 'undefined') ? includeMultiday : true

  return cal.instances.filter(function(event) {
    var dateFrom = new Date(event.dateFrom*1000),
        dateTo = new Date(event.dateTo*1000),
        multiDay = dateFrom - dateTo != 0,
        // if this is a "1 day" event, dateTo and dateFrom will both be the beginning of the given day
        // so we need to check that dateTo is 'within 24 hours' of the requested datetime
        msPerDay = 86400 * 1000,
        beginningOfDay = date - (date % msPerDay)

    var isToday = dateFrom <= date && (multiDay && date <= dateTo || beginningOfDay <= dateTo)
    return includeMultiday ? isToday : !multiDay && isToday
  })
}

