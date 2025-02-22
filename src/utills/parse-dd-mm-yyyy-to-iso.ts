export function parseDDMMYYYYToISO(value: string) {
  const [day, month, year] = value.split('/')
  return `${year}-${month}-${day}`
}
