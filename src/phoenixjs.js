(function(){

    /* Global Variables */
   

    /* Constructor */

    Phoenixjs = function(url){
        if(url) this.url = url;
        else    this.url = "http://192.168.4.1";
    };

    /* Shared Variables */
    Phoenixjs.Color = {};
    Phoenixjs.Color.BLACK = [0,0,0];
    Phoenixjs.Color.RED   = [100,0,0];
    Phoenixjs.Color.GREEN = [0,100,0];
    Phoenixjs.Color.BLUE  = [0,0,100];
    Phoenixjs.Movement = {};
    Phoenixjs.Movement.FORWARDS  = [180,0];
    Phoenixjs.Movement.BACKWARDS = [0,180];
    Phoenixjs.Movement.STOP      = [90,90];
    Phoenixjs.Movement.RIGHT     = [180,180];
    Phoenixjs.Movement.LEFT      = [0,0];

    /* Private Methods */

    var httpGet = function(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        };
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    };

    /* Shared Methods */

    // Set led N to color R G B
    Phoenixjs.prototype.setLed = function(ledN, color){
        httpGet(this.url+'/leds/'+ledN+'/'+color[0]+'/'+color[1]+'/'+color[2]);
    };

    // Set All LEDs. Note that if a led is not specified, it will be turned off.
    Phoenixjs.prototype.setLeds = function(ledConfig){
        for(i=0;i<6;i++){
            if (!ledConfig[i]) ledConfig[i]=Phoenixjs.Color.BLACK;
        };
        let query = `${this.url}/leds_set/${ledConfig[0][0]}/${ledConfig[0][1]}/${ledConfig[0][2]}/${ledConfig[1][0]}/${ledConfig[1][1]}/${ledConfig[1][2]}/${ledConfig[2][0]}/${ledConfig[2][1]}/${ledConfig[2][2]}/${ledConfig[3][0]}/${ledConfig[3][1]}/${ledConfig[3][2]}/${ledConfig[4][0]}/${ledConfig[4][1]}/${ledConfig[4][2]}/${ledConfig[5][0]}/${ledConfig[5][1]}/${ledConfig[5][2]}/`;
        console.log(query);
        httpGet(query);
    };

    // Reset All Leds
    Phoenixjs.prototype.resetLeds = function(){
        httpGet(this.url+'/leds_reset');
    };

    // Set Servo state
    Phoenixjs.prototype.setServo = function(servoN, position){
        httpGet(this.url+'/servos/'+servoN+'/'+position);
    };

    // Movement API (Servos 0 and 1)
    Phoenixjs.prototype.move = function(movement){
        httpGet(this.url+'/servos/'+0+'/'+movement[0]);
        httpGet(this.url+'/servos/'+1+'/'+movement[1]);
    };

    // Ultrasound read
    Phoenixjs.prototype.getUltrasound = function(callback){
        httpGet(this.url+'/ultrasound', function(response){
            if(callback){ callback(response); }
        });
    };


}());
