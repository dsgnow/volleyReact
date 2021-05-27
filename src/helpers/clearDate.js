const clearDate = (date) => {
  let properDate = date.slice(0, -8).replace('T', ' ')
  return properDate
}

export default clearDate
