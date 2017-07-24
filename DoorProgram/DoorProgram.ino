#include <Servo.h>
//#include <Wire.h>
#include <UnoWiFiDevEd.h>
#define SERVO 3
#define trigPinA 12
#define echoPinA 11
#define trigPinB 6
#define echoPinB 7
//#define CONNECTOR "rest"
//#define SERVER_ADDR "158.108.165.223"
#define SWITCH 5

int people = 0;
int switchInput;

//String tmpWrite = "";
//String tmpRead = "";
//String doorMStatus = "";
//CiaoData data;

Servo myServo;
boolean isOpen;
boolean willOpen;
boolean canClose;
boolean start;

void setup() {
  //  Ciao.begin();
  Serial.begin(9600);
  myServo.attach(SERVO);
  pinMode(trigPinA, OUTPUT);
  pinMode(echoPinA, INPUT);
  pinMode(trigPinB, OUTPUT);
  pinMode(echoPinB, INPUT);
  pinMode(SWITCH, INPUT);
  //  myServo.write(0);
  willOpen = false;
  start = false;
}

long checkA() {
  long duration, distanceA, distanceB;
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
  long duration, distanceA, distanceB;
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

void loop() {
  switchInput = digitalRead(SWITCH);
  //  tmpRead = "/data/5910500147/doorm/";
  //  doorMStatus = read();

  if (switchInput == LOW) {
    start = true;
    if (willOpen) willOpen = false;
    else willOpen = true;
  }

  if (start) {

    if (!willOpen) { //close
      delay(500);
      if (checkCanClose()) {
        myServo.write(0);
        isOpen = false;
      }
    }
    else { //open
      delay(500);
      myServo.write(150);

      if (checkA() < 10) {
        Serial.print("A: ");
        Serial.println(checkA());
        while (1)
        {
          Serial.print("A2: ");
          Serial.println(checkA());
          Serial.print("inwhile: ");
          delay(500);
          if (checkB() < 20) {
            Serial.print("B2: ");
            Serial.println(checkB());
            people++;
            Serial.print("People: ");
            Serial.println(people);
            Serial.print("out: ");
            break;
          }
        }
        delay(500);
      }
      else if (checkB() < 20 && people > 0) {
        Serial.print("B: ");
        Serial.println(checkB());
        while (1) {
          Serial.print("inwhile: ");
          if (checkA() < 10) {
            //delay(500);
            Serial.print("A: ");
            Serial.println(checkA());
            people--;
            Serial.print("People: ");
            Serial.println(people);
            Serial.print("out: ");
            break;
          }
        }
        delay(500);
        isOpen = true;
      }
    }
    //  tmpWrite = "/data/5910500147/people/set/" + String(people);
    //  write();
  }
}


boolean checkCanClose() {
  if (checkB() > 20) {
    return true;
  } else {
    return false;
  }
}


//void write() {
//  data = Ciao.write(CONNECTOR, SERVER_ADDR, tmpWrite);
//  Serial.print(F("Sended: "));
//  Serial.println(tmpWrite);
//}

//String read() {
//
//  data = Ciao.read(CONNECTOR, SERVER_ADDR, tmpRead);
//  //str = " / data / 5910500147 / light / set / qwertyu" ;
//  //Serial.println(str);
//  if (data.isEmpty()) {
//    Serial.println(F("False"));
//  }
//  else {
//    Serial.println(String(data.get(2)));
//    return String(data.get(2));
//  }
//}
