export default interface ApiValidationException {
  defaultMessage: string;
  field: string;
  rejectedValue: string;
}
