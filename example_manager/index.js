
var express = require('express');
var app = express();
var nmap = require('node-nmap');
nmap.nmapLocation = "nmap"; //default 
var os = require('os');

var networks = [];

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

app.get('/networks', function (req, res) {
    res.send(JSON.stringify(networks));
});

app.get('/phoenixjs.js', function (req, res) {
    res.sendFile('phoenixjs.js',{root: '../src/'});
});

app.use('/', express.static(__dirname + '/public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


function scanNetwork(callback){
    var quickscan = new nmap.QuickScan('192.168.43.0/24');
    console.log('Scanning Network');
    quickscan.on('complete', function(data){
        data = data.filter(elem=>{
            return elem.ip!=getMyIp() && !elem.ip.endsWith('.1');
        });
        console.log(data);
        networks = data;
        setTimeout(function(){
            scanNetwork();
        },5000);
    });
    quickscan.on('error', function(error){
        console.log(error);
    });
  
}

function getMyIp(){
    var ifaces = os.networkInterfaces();
    return ifaces.en0.filter(add=>add.family=='IPv4')[0].address;
}

scanNetwork();
