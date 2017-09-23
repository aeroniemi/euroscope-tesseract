var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
var notamLoader = require('./notamloader.js')



module.exports.formPage = function () {
	return new Promise(function (resolve, reject) {
		var data = fs.readFileSync("data.json");
		console.log("fefwave");
		var source = fs.readFileSync(path.join(__dirname, '../views/index.hbs'), 'utf-8');
		var template = handlebars.compile(source);
		var html = template(JSON.parse(data));
		fs.writeFile(path.join(__dirname, '../views/index.html'), html, 'utf8', function (err) {
			if (err) {
				console.log("failed to save");
				reject();
			} else {
				console.log("succeeded in saving");
				resolve();
			}
		});

	})
}
