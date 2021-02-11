import ApiValidationException from '@/errors/interfaces/ApiValidationException'

export default class FieldRules {
  public static notEmpty (v: string): boolean | string {
    return !!v || 'Это поле не должно быть пустым'
  }

  public static oneWord (v: string): boolean | string {
    if (FieldRules.valueIsNotEmpty(v)) {
      const word: string = v.replace(/^\s*/, '').replace(/\s*$/, '')
      for (const char of word) {
        if (char === ' ') return 'Не больше одного слова'
      }
    }

    return true
  }

  public static onlyWords (v: string): boolean | string {
    if (FieldRules.valueIsNotEmpty(v)) {
      if (v.match('[a-zA-Z]|[а-яА-ЯёЁ]+') === null) return 'Только буквы'
    }

    return true
  }

  public static emailRegex (v: string): boolean | string {
    if (FieldRules.valueIsNotEmpty(v)) return /.+@.+\..+/.test(v) || 'E-mail не валидный'
    else return true
  }

  public static validationErrorResponse (v: string, errors: Array<ApiValidationException>): boolean | string {
    if (!FieldRules.valueIsNotEmpty(v)) v = ''

    if (errors !== null && errors !== undefined && errors.length > 0) {
      if (v === errors[0].rejectedValue) {
        return errors[0].defaultMessage
      }
    }

    return true
  }

  private static valueIsNotEmpty (v: string): boolean {
    return v !== null && v !== undefined && v.isNotEmpty()
  }
}
