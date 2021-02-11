import dateFilter from '@/filters/dateFilter'
import firstSymbolToLowerCase from '@/filters/firstSymbolToLowerCase'
import firstSymbolToUpperCase from '@/filters/firstSymbolToUpperCase'
import onlyFirstSymbolToLowerCase from '@/filters/onlyFirstSymbolToLowerCase'
import onlyFirstSymbolToUpperCase from '@/filters/onlyFirstSymbolToUpperCase'

export default {
  install (Vue) {
    Vue.filter('dateFilter', dateFilter)
    Vue.filter('firstSymbolToLowerCase', firstSymbolToLowerCase)
    Vue.filter('firstSymbolToUpperCase', firstSymbolToUpperCase)
    Vue.filter('onlyFirstSymbolToLowerCase', onlyFirstSymbolToLowerCase)
    Vue.filter('onlyFirstSymbolToUpperCase', onlyFirstSymbolToUpperCase)
  }
}
