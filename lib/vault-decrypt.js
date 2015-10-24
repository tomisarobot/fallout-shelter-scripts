var fs = require('fs');
var fosh_crypt = require('./foshelter_crypt');

function readFile(filename, func) {
  fs.readFile(filename, 'utf8', function(err, text) {
    if (err) {
      throw err;
    }
    func(text);
  });
}

function writeFile(filename, contents) {
  fs.writeFile(filename, contents, function(err) {
    if (err) {
      throw err;
    }
  });
}

var file = 'Vault1.sav';
readFile(file, function(data) {
  var json = fosh_crypt.decrypt(data);
  writeFile(file + ".json", json);
});



