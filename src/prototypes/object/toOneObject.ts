declare global {
  interface Object {
    toOneObject(): object;
  }
}

export default () => {
  // eslint-disable-next-line no-extend-native
  Object.prototype.toOneObject = function () {
    return this
  }
}
