import { format, parseISO } from 'date-fns'

const formatTimeToLocal = (date) => {
  const dateString = date.toISOString()
  const parsedTime = parseISO(dateString)
  const formattedTime = format(parsedTime, 'yyyy-MM-dd kk:mm:ss')
  return formattedTime
}

export default formatTimeToLocal
