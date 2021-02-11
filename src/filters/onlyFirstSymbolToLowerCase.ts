export default function onlyFirstSymbolToLowerCase (value: string): string {
  if (value.length > 0) return value.charAt(0).toLowerCase()

  return ''
}
