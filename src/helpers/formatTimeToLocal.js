import { formatISO9075 } from 'date-fns'

const formatTimeToLocal = (date) => {
  const dateString = formatISO9075(date)
  return dateString
}

export default formatTimeToLocal
