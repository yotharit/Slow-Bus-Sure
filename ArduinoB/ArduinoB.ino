#include <Wire.h>
#include <UnoWiFiDevEd.h>
#include <Servo.h>



// untest เสา velo



#define REFLEX A3
#define CONNECTOR "rest"
#define SERVER_ADDR "158.108.165.223"
// A is IN
// B is OUT
#define SERVOIN 10
#define SERVOOUT 9

#define trigPinA 12
#define echoPinA 11
#define trigPinB 8
#define echoPinB 7
#define SWITCH 6

#define MOTOR1 3
#define MOTOR2 5
short REFLECTOR;

#define xPin A0
#define yPin A1
#define zPin A2
unsigned long mPrevTime, mCurTime;

String tmpWrite = "";
String tmpRead = "";

int people = 0;
int switchInput;

Servo myServoIN;
Servo myServoOUT;

boolean isOpen;
boolean willOpen;
boolean canClose;
boolean start;
bool OpenIN = false;
bool OpenOUT = false;

CiaoData data;

void setup() {
  Ciao.begin();
  Serial.begin(9600);

  myServoIN.attach(SERVOIN);
  myServoOUT.attach(SERVOOUT);
  myServoOUT.write(180);
  myServoIN.write(180);
  pinMode(trigPinA, OUTPUT);
  pinMode(echoPinA, INPUT);
  pinMode(trigPinB, OUTPUT);
  pinMode(echoPinB, INPUT);
  pinMode(SWITCH, INPUT);

  willOpen = false;
  start = false;
  mPrevTime = micros();
  pinMode(REFLEX, INPUT);
  pinMode(MOTOR1, OUTPUT);
  pinMode(MOTOR2, OUTPUT);
}


inline float calG(int readValue, int rawMin, int rawMax) {
  float avg = (rawMax + rawMin) / 2;
  return (readValue - avg) / (rawMax - avg) * 9.8;
}
float vx = 0;
float vy = 0;
float vz = 0;
bool stickdown = false;
void loop() {
  //เสา
  REFLECTOR = analogRead(REFLEX);
  Serial.print(F("Light: "));
  Serial.println(REFLECTOR);

  if (REFLECTOR > 350 && stickdown == false) {
    //เสาลง
    Serial.println(F("DOWNNNNN"));
    analogWrite(MOTOR1 , 200);
    digitalWrite(MOTOR2 , LOW);
    delay (5000);
    digitalWrite(MOTOR1 , LOW);
    digitalWrite(MOTOR2 , LOW);
    stickdown = true;

    tmpWrite = "/data/kaoyum/pillar/set/1" ;
    write();
  }
  else if (stickdown == true && REFLECTOR < 350) { //เสาขึ้น

    Serial.println(F("UPPPPPPP"));
    analogWrite(MOTOR2 , 200);
    digitalWrite(MOTOR1 , LOW);
    
    delay (5000);
    digitalWrite(MOTOR1 , LOW);
    digitalWrite(MOTOR2 , LOW);
    stickdown = false;

    tmpWrite = "/data/kaoyum/pillar/set/0" ;
    write();
  }


  //Velocity

  mCurTime = micros();

  int xRead = analogRead(xPin);
  int yRead = analogRead(yPin);
  int zRead = analogRead(zPin);
  //Serial.println(yRead);
  //Serial.println(zRead);
  //delay(100);
  /*float gz = calG(zRead, 290, 420);
    if(gz<0.5)
    {
    gz = 0;
    }
    vz += gz * (mCurTime - mPrevTime) / 1e6;*/
  float gy = calG(yRead, 290, 421);
  if (gy >= -1 && gy <= 1)
  {
    gy = 0;
  }
  vy = gy * (mCurTime - mPrevTime) / 1e6;
  float gx = calG(xRead, 283, 426);
  if (gx >= -1 && gx <= 1)
  {
    gx = 0;
  }
  vx = gx * (mCurTime - mPrevTime) / 1e6;
  float vtotal = sqrt((vx * vx) + (vy * vy));
  Serial.print(F("Velo= "));
  Serial.println(vtotal);
  //  delay(1000);
  mPrevTime = mCurTime;

  tmpWrite = "/data/kaoyum/velocity/set/" + String(vtotal);
  write();


  //DOOR
  ////
  ////  switchInput = digitalRead(SWITCH);
  ////
  ////  if (switchInput == LOW) {
  ////    start = true;
  ////    //    if (willOpen) willOpen = false;
  ////    //    else willOpen = true;
  ////    willOpen = !willOpen;
  ////  }
  //
  ////  if (start) {
  //    Serial.println("ON");
  //    if (!willOpen) { //close
  //      delay(500);
  //      if (checkCanClose()) {
  //        myServo.write(0);
  //        isOpen = false;
  //      }
  //    }
  //    else { //open
  //      delay(500);
  //      myServo.write(150);
  //
  //      if (checkA() < 10) {
  //        people++;
  //        delay(50);
  //      }
  //      else if (checkB() < 20 && people > 0) {
  //        people--;
  //        delay(50);
  //        isOpen = true;
  //      }
  //    }
  //    //  tmpWrite = "/data/5910500147/people/set/" + String(people);
  //    //  write();
  //    tmpWrite = "/data/kaoyum/people/set/" + String(people);
  //    write();

  //  }
  //  else {
  //    Serial.println("OFF");
  //  }
  // tmpRead = "/data/kaoyum/doorout/";
  // if (read() == "1" || digitalRead(SWITCH) == 0 )
  // {
  //    tmpRead = "/data/kaoyum/doorin/";
  while (digitalRead(SWITCH) == 0/*  || read() == "1" */) {
    Serial.println(F("All OPEN"));
    OpenIN = true;
    OpenOUT = true;

    // tmpRead = "/data/kaoyum/doorin/";
    //if (read() == "1")
    myServoIN.write(80);
    //tmpRead = "/data/kaoyum/doorout/";
    // if (read() == "1")
    myServoOUT.write(50);

    if (checkA() < 10) {
      people++;
    }
    if (checkB() < 5) {
      if (people > 0)people--;
    }
    delay(1000);
    tmpWrite = "/data/kaoyum/doorin/set/1";
    write();
    tmpWrite = "/data/kaoyum/doorout/set/1";
    write();
  }
  // read();
  // }
  if (digitalRead(SWITCH) == 1) {
    if (checkA() < 10 && OpenIN == true) {
      people++;
    }
    if (checkB() < 5 && OpenOUT == true) {
      if (people > 0) people--;

    }
    if (checkA() > 10 ) {
      Serial.println(F("IN CLOSE"));
      myServoIN.write(180);
      OpenIN = false;
      tmpWrite = "/data/kaoyum/doorin/set/0";
      write();
    }
    if (checkB() > 3 ) {
      Serial.println(F("OUT CLOSE"));
      myServoOUT.write(180);
      OpenOUT = false;
      tmpWrite = "/data/kaoyum/doorout/set/0";
      write();
    }
  }

  Serial.print(F("PEOPLE: "));
  Serial.println(people);
  tmpWrite = "/data/kaoyum/people/set/" + String(people);
  write();
}

void write() {
  data = Ciao.write(CONNECTOR, SERVER_ADDR, tmpWrite);
  Serial.print(F("Sended: "));
  Serial.println(tmpWrite);
}

String read() {
  data = Ciao.read(CONNECTOR, SERVER_ADDR, tmpRead);
  if (data.isEmpty()) {
    Serial.println(F("False"));
  }
  else {
    Serial.print(F("READ: "));
    Serial.println(String(data.get(2)));
    return String(data.get(2));
  }
}

long checkA() {
  long duration, distanceA;
  digitalWrite(trigPinA, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPinA, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPinA, LOW);
  duration = pulseIn(echoPinA, HIGH);
  distanceA = (duration / 2.0) / 29.1;
  Serial.print("A: ");
  Serial.println(distanceA);
  delay(500);

  return distanceA;
}
long checkB() {
  long duration, distanceB;
  digitalWrite(trigPinB, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPinB, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPinB, LOW);
  duration = pulseIn(echoPinB, HIGH);
  distanceB = (duration / 2.0) / 29.1;
  Serial.print("B: ");
  Serial.println(distanceB);
  delay(1000);

  return distanceB;
}
boolean checkCanClose() {
  if (checkB() > 20) {
    return true;
  } else {
    return false;
  }
}

