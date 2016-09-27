int firstSensor = 0;    // first analog sensor
int secondSensor = 0;   // second analog sensor
int thirdSensor = 0;    // digital sensor
int inByte = 0;         // incoming serial byte

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  pinMode(2, INPUT);   // digital sensor is on digital pin 2
  establishContact();  // send a byte to establish contact until receiver responds
}

void loop() {
  if (Serial.available() > 0) {
    inByte = Serial.read();
    firstSensor = analogRead(A0) / 4;
    delay(10);
    secondSensor = analogRead(1) / 4;
    thirdSensor = map(digitalRead(2), 0, 1, 0, 255);
    Serial.write(firstSensor);
    Serial.write(secondSensor);
    Serial.write(thirdSensor);
  }
}

void establishContact() {
  while (Serial.available() <= 0) {
    Serial.print('A');   // send a capital A
    delay(300);
  }
}

int bgcolor;			     // Background color
int fgcolor;			     // Fill color
Serial myPort;                       // The serial port
int[] serialInArray = new int[3];    // Where we'll put what we receive
int serialCount = 0;                 // A count of how many bytes we receive
int xpos, ypos;		             // Starting position of the ball
boolean firstContact = false;        // Whether we've heard from the microcontroller

void setup() {
  size(256, 256);  // Stage size
  noStroke();      // No border on the next thing drawn

  xpos = width/2;
  ypos = height/2;

  println(Serial.list());

  String portName = Serial.list()[0];
  myPort = new Serial(this, portName, 9600);
}

void draw() {
  background(bgcolor);
  fill(fgcolor);
  ellipse(xpos, ypos, 20, 20);
}

void serialEvent(Serial myPort) {
  int inByte = myPort.read();
  if (firstContact == false) {
    if (inByte == 'A') {
      myPort.clear();          // clear the serial port buffer
      firstContact = true;     // you've had first contact from the microcontroller
      myPort.write('A');       // ask for more
    }
  }
  else {
    serialInArray[serialCount] = inByte;
    serialCount++;

    if (serialCount > 2 ) {
      xpos = serialInArray[0];
      ypos = serialInArray[1];
      fgcolor = serialInArray[2];

      println(xpos + "\t" + ypos + "\t" + fgcolor);

      myPort.write('A');
      serialCount = 0;
    }
  }
}
