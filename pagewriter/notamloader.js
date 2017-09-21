var handlebars = require('handlebars')
var fs = require('fs');
var path = require('path');
var notams = require('notams');
var data = {
   "firs":[
      {
         "id":0,
         "firCode":"LRBB",
         "firName":"Bucharest",
         "sfUpdated":"2017 09 20",
         "sfAirac":"1611",
         "sfLastPos":"LRBB_L_CTR",
         "notamAirports":[
            {
               ntCode:'LROP',
               ntName:"Otopeni",
               ntNotams:'',

            },
            {
               ntCode:'LRCL',
               ntName:"Cluj",
               ntNotams:'',

            },
            {
               ntCode:'LRTR',
               ntName:"Timisoara",
               ntNotams:'',

            }
         ]
      },
      {
         "id":1,
         "firCode":"LBSR",
         "firName":"Sofia",
         "sfUpdated":"2017 09 10",
         "sfAirac":"1612",
         "sfLastPos":"LBSR_CTR",
         "notamAirports":[
            {
               "ntCode":'LROP',
               "ntName":"Otopeni",
               "ntNotams":'',

            },
            {
               "ntCode":'LRCL',
               "ntName":"Cluj",
               "ntNotams":'',

            },
            {
               "ntCode":'LRTR',
               "ntName":"Timisoara",
               "ntNotams":''

            }
         ]
      }
   ],

} ;

var notamLoad = function(){
    for (var i = 0; i < data.firs.length; i++) {
        for (var y = 0; y < data.firs[i].notamAirports.length; y++) {
            var nqAirport = data.firs[i].notamAirports[y]
            console.log(nqAirport.ntCode);
            notams(nqAirport.ntCode, { format: 'ICAO' }).then(results => {nqAirport.ntNotams = results;
                                                                          console.log(nqAirport.ntNotams);
                                                                         })
    }

    }
    
}
notamLoad();