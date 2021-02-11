import { Field } from '@/constants'
import ApiBadRequestException from '@/errors/ApiBadRequestException'
import ApiValidationException from '@/errors/interfaces/ApiValidationException'
import Exception from '@/errors/Exception'
import FieldRules from '@/utils/FieldRules'
import User from '@/models/users/User'

interface Data {
  // Rules for email field
  emailRules: Array<Function>;
  firstNameRules: Array<Function>;
  lastNameRules: Array<Function>;
  passwordRules: Array<Function>;
  // Email validation exception
  emailErrors: Array<ApiValidationException>;

  // Email validation exception
  firstnameErrors: Array<ApiValidationException>;

  // Email validation exception
  lastnameErrors: Array<ApiValidationException>;
  passwordErrors: Array<ApiValidationException>;
}

export default {
  data () {
    return {
      emailRules: [
        FieldRules.notEmpty,
        FieldRules.emailRegex,
        FieldRules.oneWord,
        (v: string) => FieldRules.validationErrorResponse(v, (this as any).emailErrors)
      ],
      emailErrors: [],
      firstNameRules: [
        FieldRules.notEmpty,
        FieldRules.onlyWords,
        FieldRules.oneWord,
        (v: string) => FieldRules.validationErrorResponse(v, (this as any).firstnameErrors)
      ],
      firstnameErrors: [],
      lastNameRules: [
        FieldRules.notEmpty,
        FieldRules.oneWord,
        (v: string) => FieldRules.validationErrorResponse(v, (this as any).lastnameErrors)
      ],
      lastnameErrors: [],
      passwordRules: [
        FieldRules.notEmpty,
        FieldRules.oneWord,
        (v: string) => FieldRules.validationErrorResponse(v, (this as any).passwordErrors)
      ],
      passwordErrors: []
    } as Data
  },
  methods: {
    checkResponseOnBadRequest (response: Either<Exception, User>): boolean {
      if (!response.isOk && response.value instanceof ApiBadRequestException) {
        this.emailErrors = response.value.errors[Field.EMAIL]
        this.firstnameErrors = response.value.errors[Field.FIRSTNAME]
        this.lastnameErrors = response.value.errors[Field.LASTNAME]
        this.passwordErrors = response.value.errors[Field.PASSWORD]

        return true
      }

      return false
    }
  }
}
