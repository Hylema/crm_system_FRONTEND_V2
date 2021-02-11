declare global {
  interface Array<T> {
    removeByIndex(index: number): Array<T>;
  }
}

export default () => {
  // eslint-disable-next-line no-extend-native
  Array.prototype.removeByIndex = function (index: number) {
    return this.splice(index, 1)
  }
}
