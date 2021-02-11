export default function firstSymbolToLowerCase (value: string): string {
  if (value.length > 0) return value.charAt(0).toLowerCase() + value.slice(1)

  return ''
}
