var handlebars = require('handlebars')
var fs = require('fs');
var path = require('path');
var notams = require('notams');
var pageWriter = require('./pageWriter.js')
var data = {
	"firs": [
		{
			"id": 0,
			"firCode": "LRBB",
			"firName": "Bucharest",
			"sfUpdated": "2017 09 20",
			"sfAirac": "1611",
			"sfLastPos": "LRBB_L_CTR",
			"notamAirports": [
				{
					ntCode: 'LROP',
					ntName: "Otopeni",
					ntNotams: '',

                },
				{
					ntCode: 'LRCL',
					ntName: "Cluj",
					ntNotams: '',

                },
				{
					ntCode: 'LRTR',
					ntName: "Timisoara",
					ntNotams: '',

                }
            ]
        },
		{
			"id": 1,
			"firCode": "LBSR",
			"firName": "Sofia",
			"sfUpdated": "2017 09 10",
			"sfAirac": "1612",
			"sfLastPos": "LBSR_CTR",
			"notamAirports": [
				{
					"ntCode": 'LBSF',
					"ntName": "Sofia",
					"ntNotams": "",

                },
				{
					"ntCode": 'LBBG',
					"ntName": "Burgas",
					"ntNotams": "",

                },
				{

					"ntCode": 'LBWN',
					"ntName": "Varna",
					"ntNotams": ""

                }
            ]
			]
	}
	]

};

var notamLoadCompleted = function (values) {
	fs.writeFileSync("data.json", JSON.stringify(data), 'utf8', function (err) {
		if (err) {
			console.log("failed to save");
			reject();
		} else {
			console.log("succeeded in saving");
			// pageWriter.formPage(data)
			resolve();
		}
	});

}
module.exports.notamLoad = function () {
	return new Promise(function (resolve, reject) {
		var callbacks = [];
		for (var i = 0; i < data.firs.length; i++) {
			for (var y = 0; y < data.firs[i].notamAirports.length; y++) {
				let nqAirport = data.firs[i].notamAirports[y];
				console.log(nqAirport.ntCode);
				callbacks.push(notams(nqAirport.ntCode, {
					format: 'ICAO'
				}).then(function (values) {
					nqAirport.ntNotams = values[0].notams;
				}));
			}
		}
	})
	resolve(Promise.all(callbacks).then(notamLoadCompleted));

}
