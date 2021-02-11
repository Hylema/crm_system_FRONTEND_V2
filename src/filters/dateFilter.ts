export default function dateFilter (formDate) {
  function addZero (minutes) {
    if (minutes.toString().length === 1) {
      return `0${minutes}`
    } else {
      return minutes
    }
  }

  const date = new Date(formDate)
  const dateDay = date.getUTCDate()
  const dateMonth = date.getMonth()
  const dateYear = date.getFullYear()
  const dateHours = date.getHours()
  const dateMinutes = addZero(date.getUTCMinutes())

  const currentDate = new Date()
  const currentDateDay = currentDate.getUTCDate()
  const currentDateMonth = currentDate.getMonth()
  const currentDateYear = currentDate.getFullYear()
  const currentDateHours = currentDate.getHours()
  const currentDateMinutes = addZero(currentDate.getUTCMinutes())

  // console.log(currentDate, 'currentDate')
  // console.log(date, 'taskDate')
  // console.log(date.getHours(), 'date.getUTCHours()')

  let dateTitle
  let timeTitle
  let resultDate = 'Ошибка'

  const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
  ]

  if (
    currentDateDay === dateDay &&
    currentDateMonth === dateMonth &&
    currentDateYear === dateYear
  ) {
    dateTitle = 'сегодня'

    if (dateHours === currentDateHours) {
      resultDate = `${currentDateMinutes - dateMinutes} мин. назад`

      if (currentDateMinutes === dateMinutes) {
        resultDate = 'Только что'
      }
    } else if (currentDateHours - dateHours <= 6) {
      // console.log(currentDateHours, 'currentDateHours')
      // console.log(dateHours, 'dateHours')
      switch (currentDateHours - dateHours) {
        case 1: resultDate = 'час назад'; break
        case 2: resultDate = '2 часа назад'; break
        case 3: resultDate = '3 часа назад'; break
        case 4: resultDate = '4 часа назад'; break
        case 5: resultDate = '5 часов назад'; break
        case 6: resultDate = '6 часов назад'; break
        default: resultDate = `${dateTitle} в ${dateHours}:${dateMinutes}`
      }
    } else {
      resultDate = `${dateTitle} в ${dateHours}:${dateMinutes}`
    }
  } else if (
    (currentDateDay - 1) === dateDay &&
    currentDateMonth === dateMonth &&
    currentDateYear === dateYear
  ) {
    dateTitle = 'Вчера'
    resultDate = `${dateTitle} в ${dateHours}:${dateMinutes}`
  } else if (currentDateYear !== dateYear) {
    resultDate = `${dateDay}  ${monthNames[dateMonth]}  ${dateYear} в ${dateHours}:${dateMinutes}`
  } else {
    resultDate = `${dateDay}  ${monthNames[dateMonth]} в ${dateHours}:${dateMinutes}`
  }

  return resultDate
}
