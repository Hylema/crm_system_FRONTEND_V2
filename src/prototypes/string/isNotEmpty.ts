declare global {
  interface String {
    isNotEmpty(): boolean;
  }
}

export default () => {
  // eslint-disable-next-line no-extend-native
  String.prototype.isNotEmpty = function () {
    return this !== ''
  }
}
