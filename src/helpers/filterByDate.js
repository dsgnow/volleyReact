const filterByDate = (data) => {
  let date = new Date()
  date.setDate(date.getDate() - 1)
  let filteredData = data.filter((el) => el.dateEnd >= date.toISOString())
  return filteredData
}

export default filterByDate
