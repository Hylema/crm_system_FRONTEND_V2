export default function onlyFirstSymbolToUpperCase (value) {
  if (value.length > 0) return value.charAt(0).toUpperCase()

  return ''
}
