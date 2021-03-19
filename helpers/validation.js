export const required = (value) =>
  value && value.length ? null : 'Esse campo é obrigatório!'

export const requiredLen = (length, { digitsOnly = true } = {}) => (value) => {
  const cleaned = digitsOnly ? value && value.replace(/\D/g, '') : value
  return cleaned && cleaned.length >= length
    ? null
    : `Esse campo precisa ter, pelo menos, ${length} caracteres/números`
}

const validateFirstDigit = (cpf) => {
  if (!cpf) return false
  const [, numb, digits] = cpf.match(/(\d{9})(\d{2})/) || ['0', '0', '00']
  const weightList = [10, 9, 8, 7, 6, 5, 4, 3, 2]
  const firstSum = numb
    .split('')
    .reduce((acc, num, index) => num * weightList[index] + parseInt(acc), 0)

  let firstDigitRes = (firstSum * 10) % 11
  firstDigitRes = firstDigitRes === 10 ? 0 : firstDigitRes

  return firstDigitRes === parseInt(digits[0])
}

const validateSecondDigit = (cpf) => {
  if (!cpf) return false
  const [, numb, digits] = cpf.match(/(\d{9})(\d{2})/) || ['0', '0', '00']
  const weightList = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
  const secondSum = [...numb.split(''), digits[0]].reduce(
    (acc, num, index) => num * weightList[index] + parseInt(acc),
    0
  )

  let secondDigitRes = (secondSum * 10) % 11
  secondDigitRes = secondDigitRes === 10 ? 0 : secondDigitRes

  return secondDigitRes === parseInt(digits[1])
}

export const validarCPF = (value) => {
  const cpf = value ? value.replace(/[^\d]+/g, '') : ''
  const msg = 'Por favor, insira um CPF válido!'
  const knownFalses = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ]

  if (cpf.length !== 11 || knownFalses.includes(cpf)) {
    return msg
  }

  if (!validateFirstDigit(cpf) || !validateSecondDigit(cpf)) {
    return msg
  }

  return null
}

export const validExpiration = (val) => {
  const [month, year] = (val && val.split('/')) || []
  const parsedMonth = parseInt(month)
  const validMonth = parsedMonth > 0 && parsedMonth <= 12
  const validYear = parseInt(year) >= 21
  return validMonth && validYear ? null : 'Por favor, insira uma data válida!'
}
