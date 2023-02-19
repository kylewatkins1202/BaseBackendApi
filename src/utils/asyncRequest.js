const request = require('request')

const asyncRequest = function(options) {
  return new Promise((resolve,reject) => {
    request(options, (error, response, body) => {
      if (response) {
        return resolve({response, body});
      }
      if (error) {
        return reject(error);
      }
    });
  });
};

module.exports = asyncRequest