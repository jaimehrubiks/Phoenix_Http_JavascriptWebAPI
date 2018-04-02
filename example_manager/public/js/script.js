
var api = new Phoenixjs();
console.log('Init script');

var devices = [];
var selecteddevices = [];

var netlist = $("#netlist");
var selectedlist = $("#selectedlist");

setInterval(function(){
    console.log('query networks');
    getQuery('/networks',function(res){
        console.log(res);
        devices=JSON.parse(res);
        updateDevices();
    });
},5000);

function updateDevices(){
    netlist.find("tr:gt(0)").remove();
    devices.forEach(el=>{
        netlist.append( '<tr><td>' + el.ip + '</td><td>'+el.hostname+'</td><td class="addbtn"><button>Add</button></td></tr>' );
    });

    var addbtn = $(".addbtn");
    addbtn.click(function(evt){
        var col = $(this).index(),
            row = $(this).parent().index(),
            ip = $(this).parent().find('td:first').text();
        console.log(ip);
        selecteddevices.push(ip);
        selectedlist.append('<li>'+ip+'</li>');
    });
};

$("#forwards").click(function(){
    selecteddevices.forEach(el=>{
        api.url='http://'+el;
        api.move(Phoenixjs.Movement.FORWARDS);
    });
});
$("#stop").click(function(){
    selecteddevices.forEach(el=>{
        api.url='http://'+el;
        api.move(Phoenixjs.Movement.STOP);
    });
});
$("#right").click(function(){
    selecteddevices.forEach(el=>{
        api.url='http://'+el;
        api.move(Phoenixjs.Movement.RIGHT);
    });
});
$("#left").click(function(){
    selecteddevices.forEach(el=>{
        api.url='http://'+el;
        api.move(Phoenixjs.Movement.LEFT);
    });
});
$("#backwards").click(function(){
    selecteddevices.forEach(el=>{
        api.url='http://'+el;
        api.move(Phoenixjs.Movement.BACKWARDS);
    });
});
var getQuery = function(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
};

var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;


var states={
    STOP: 0,
    FORWARDS: 1,
    BACKWARDS: 2,
    RIGHT: 3,
    LEFT: 4
};

var state = states.STOP;
var gyroscope;

$("#enablegy").click(function(){
    console.log('orientation on');
    gyroscope = true;
});

$("#disablegy").click(function(){
    console.log('orientation off');
    gyroscope = false;
});

function handleOrientation(event) {

    var x = event.beta;  // In degree in the range [-180,180]
    var y = event.gamma; // In degree in the range [-90,90]

    output.innerHTML  = "beta : " + x + "\n";
    output.innerHTML += "gamma: " + y + "\n";
    var beta = x; var gamma = y;

    // MOVEMENT LOGIC
    if(gyroscope){
    if (beta > -30 && beta < 40 && gamma < 50 && gamma > -35){
        if(state != states.STOP){
            state = states.STOP;
            selecteddevices.forEach(el=>{
                api.url='http://'+el;
                api.move(Phoenixjs.Movement.STOP);
            });
        }
    }else if(beta < -30){
        if(state != states.FORWARDS){
            state = states.FORWARDS;
            selecteddevices.forEach(el=>{
                api.url='http://'+el;
                api.move(Phoenixjs.Movement.FORWARDS);
            });
        }
    }else if(beta > 40){
        if(state != states.BACKWARDS){
            state = states.BACKWARDS;
            selecteddevices.forEach(el=>{
                api.url='http://'+el;
                api.move(Phoenixjs.Movement.BACKWARDS);
            });
        }
    }else if(gamma > 50){
        if(state != states.RIGHT){
            state = states.RIGHT;
            selecteddevices.forEach(el=>{
                api.url='http://'+el;
                api.move(Phoenixjs.Movement.RIGHT);
            });
        }
    }else if(gamma < -35){
        if(state != states.LEFT){
            state = states.LEFT;
            selecteddevices.forEach(el=>{
                api.url='http://'+el;
                api.move(Phoenixjs.Movement.LEFT);
            });
        }
    }
    }

    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (x >  90) { x =  90;};
    if (x < -90) { x = -90;};

    // To make computation easier we shift the range of 
    // x and y to [0,180]
    x += 90;
    y += 90;

    // 10 is half the size of the ball
    // It center the positioning point to the center of the ball
    ball.style.top  = (maxX*x/180 - 10) + "px";
    ball.style.left = (maxY*y/180 - 10) + "px";
}

window.addEventListener('deviceorientation', handleOrientation);
