var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
eval(require('fs').readFileSync('../src/phoenixjs.js', 'utf8'));

var api = new Phoenixjs();
var sleep = require('sleep');

console.log('Moving.');
api.move(Phoenixjs.Movement.FORWARDS);
api.getUltrasound(data=>{console.log(data);});
setTimeout(function(){
    console.log('Stopping.');
    api.move(Phoenixjs.Movement.STOP);
    api.getUltrasound(data=>{console.log(data);});
},2000);
console.log('End.');

