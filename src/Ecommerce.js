const fs = require("fs");
const lodash = require("lodash");

const readFileContents = (fileName, cb) => {
  try {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        cb("Encountered error while reading file contents..!", null);
      } else {
        cb(null, data.split("\n"));
      }
    });
  } catch (err) {
    cb(err, null);
  }
};

const sortDataOnPrice = (fileContents, cb) => {
  try {
    let sortedData = lodash.sortBy(
      fileContents,
      (item) => parseInt(item.retail_price) || 0
    );
    cb(null, sortedData);
  } catch (err) {
    cb(err, null);
  }
};

const sortDataOnRating = (fileContents, cb) => {
  let filteredData = fileContents.filter(
    (item) => item.product_rating !== "No rating available"
  );

  let sortedData = lodash.sortBy(filteredData, (item) => {
    return parseInt(item.product_rating);
  });
  sortedData = lodash.compact(sortedData);
  cb(null, lodash.reverse(sortedData));
};

const writeSortedDataToFile = (outputFileName, sortedData, cb) => {
  const jsonData = JSON.stringify(sortedData, null, 2);

  fs.writeFile(outputFileName, jsonData, "utf8", (err) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, jsonData);
    }
  });
};

module.exports = {
  readFileContents,
  sortDataOnPrice,
  sortDataOnRating,
};
