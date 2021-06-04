const filterByDate = (data) => {
  let date = new Date()
  date.setDate(date.getDate() - 1)
  let filteredData = data.filter((el) => el.dateEnd >= date.toISOString())
  filteredData.sort(function (a, b) {
    var c = new Date(a.dateStart)
    var d = new Date(b.dateStart)
    return c - d
  })
  return filteredData
}

export default filterByDate
