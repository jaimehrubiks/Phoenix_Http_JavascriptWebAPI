var api = new Phoenixjs();

// Led 0 a rojo
api.setLed(0,[100,0,0]); 
api.setLed(0,Phoenixjs.Color.RED); // Available: RED, GREEN, BLUE, BLACK

// Led 5 y 4 a verde, el resto a 0;
var leds = [];
leds[4]=Phoenixjs.Color.GREEN; leds[5]=[0,100,0];
api.setLeds(leds); 

// Reset LEDS (All BLACK)
api.resetLeds();

// Set Servo 1 to go forwards (180degree)
api.setServo(1,180);

// Set PHOENIX to move FORWARD (servos 1 and 2) 
api.move(Phoenixjs.Movement.FORWARDS); // Available: FORWARDS, BACKWARDS, LEFT, RIGT, STOP
