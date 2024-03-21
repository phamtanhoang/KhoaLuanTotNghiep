function capitalizeEachWord(str: string) {
  return str.toLowerCase().replace(/(^|\s)\S/g, function (match) {
    return match.toUpperCase();
  });
}
