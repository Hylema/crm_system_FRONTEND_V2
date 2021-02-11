export default function firstSymbolToUpperCase (value: string): string {
  if (value.length > 0) return value.charAt(0).toUpperCase() + value.slice(1)

  return ''
}
