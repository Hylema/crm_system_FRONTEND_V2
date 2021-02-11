declare global {
  interface String {
    format(data: any): string;
  }
}

export default () => {
  // eslint-disable-next-line no-extend-native
  String.prototype.format = function (data) {
    const regex = new RegExp(/{(.*?)}/g)

    return this.replace(regex, (entry, word) => data[word])
  }
}
