const doExist = (value) => value !== null && value !== undefined

const leftpad = (value, minlen, padding = '') => {
  let str = `${value}`
  let i = 0
  // finds how many characters are needed for minLen
  const len = minlen - str.length

  while (++i <= len) {
    str = `${padding}${str}`
  }

  return str
}

const maxLen = (str, len) => str.slice(0, len)

export const currency = (value) => {
  const cleanValue = parseInt(`${value}`.replace(/[^0-9]/g, ''))

  if (!cleanValue) {
    return ''
  }

  const rxMil = /(\d)(?=(\d{3})+,)/g
  const rxCent = /(\d{2}$)/g

  let num = leftpad(cleanValue, 3, '0')
  const formatted = num.replace(rxCent, ',$1').replace(rxMil, '$1.')

  return `R$ ${formatted}`
}

const deleteLast = (string, char = []) => {
  // to take care when last char is part of the formatting
  if (doExist(string) && char.includes(string[string.length - 1])) {
    return string.slice(0, string.length - 1)
  }

  return string
}

export const cpf = (value) => {
  const cleanValue = maxLen(value.replace(/\D/g, ''), 11)
  let formatted

  const rxDots = /(\d{3})/g
  const rxFull = /(\d{3})(\d{3})(\d{3})(\d{2})/g

  formatted = cleanValue.replace(rxFull, '$1.$2.$3-$4')

  if (cleanValue.length < 9) {
    formatted = cleanValue.replace(rxDots, '$1.')
  }

  if (cleanValue.length > 10) {
    formatted = cleanValue.replace(rxFull, '$1.$2.$3-$4')
  }

  return deleteLast(formatted, ['.', '-'])
}

export const cvv = (value) => maxLen(value.replace(/\D/g, ''), 3)

export const expiration = (value) => {
  const cleanValue = maxLen(value.replace(/\D/g, ''), 4)
  const rx = /(\d{2})(\d{2})/g
  return cleanValue.replace(rx, '$1/$2')
}

export const card = (value) => {
  const cleanValue = maxLen(value.replace(/\D/g, ''), 16)
  if (!cleanValue) {
    return ''
  }
  const rx = /(\d{4})/g
  return deleteLast(cleanValue.replace(rx, '$1 '), [' '])
}

export const nonDigits = (value) => value.replace(/\d/g, '')
