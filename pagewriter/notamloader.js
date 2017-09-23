var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
var notams = require('notams');
var pageWriter = require('./pageWriter.js');
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
					ntCode: "LROP",
					ntName: "Otopeni",
					ntNotams: " ",

                },
				{
					ntCode: "LRCL",
					ntName: "Cluj",
					ntNotams: " ",

                },
				{
					ntCode: "LRTR",
					ntName: "Timisoara",
					ntNotams: " ",

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
					"ntCode": "LBSF",
					"ntName": "Sofia",
					"ntNotams": " ",

                },
				{
					"ntCode": "LBBG",
					"ntName": "Burgas",
					"ntNotams": " ",

                },
				{

					"ntCode": "LBWN",
					"ntName": "Varna",
					"ntNotams": " "

                }
            ]

	}
	]

};

module.exports = function () {
	return new Promise(function (resolve, reject) {
		var callbacks = [];
		for (var i = 0; i < data.firs.length; i++) {
			for (var y = 0; y < data.firs[i].notamAirports.length; y++) {
				let nqAirport = data.firs[i].notamAirports[y];
				nqAirport.ntNotams = [];

				callbacks.push(notams(nqAirport.ntCode, {
					format: 'ICAO'
				}).then(function (values) {
					var regex = /\b(\w)\) ([\w\W]+?)(?=\s\w\)|CREATED:)/g;
					var currentValue = values[0].notams;

					for (var i = 0; i < currentValue.length; i++) {
						var currentArray = [];
						var currentOutObject = {};
						while (currentArray = regex.exec(currentValue[i])) {
							if (currentArray[1] == "Q") {
								// ignore Q
							} else if (currentArray[1] == "A") {
								// ignore A
							} else {
								currentOutObject[currentArray[1]] = currentArray[2];
							}
						}
						nqAirport.ntNotams.push(currentOutObject);
					}
				}));
			}
		}
		Promise.all(callbacks).then(function () {
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
};
