exports.fileNameGenerator = (fileMimeType) => {
  return (
    Math.floor(Math.random() * 10000000) +
    Date.now() +
    "." +
    fileMimeType.split("/")[1]
  ).toString();
};
