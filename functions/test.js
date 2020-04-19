const crypto = require('crypto');

function md5(text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

let hash = md5('test');
console.log(hash);