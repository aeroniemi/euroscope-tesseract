var handlebars = require('handlebars')
var fs = require('fs');
var path = require('path');
var notams = require('notams');


module.exports = function () {
	return new Promise(function (resolve, reject) {
		var callbacks = [];
		var data = JSON.parse(fs.readFileSync("data.json"));
		for (var i = 0; i < data.firs.length; i++) {
			for (var y = 0; y < data.firs[i].notamAirports.length; y++) {
				for (var z = 0; z < data.firs[i].notamAirports[y].ntNotams.length; z++) {
					let nzNotam = data.firs[i].notamAirports[y].ntNotams[z];
					nzNotam = JSON.stringify(nzNotam).replace(/(\n|\\n)+/g, '<br>').replace(/^[^\-]*(B\))/g, '').replace(/(CREATED:)(.*)+/g, '');
					//console.log(nzNotam);
				}
			}
		}
		Promise.all().then(function () {
			console.log("test");
			fs.writeFile("data.json", JSON.stringify(data), function (err) {
				if (err) {
					console.log("failed to save");
					reject();
				} else {
					console.log("succeeded in saving");
					// pageWriter.formPage(data)
					resolve();
				}
			});
		});
	});
}
