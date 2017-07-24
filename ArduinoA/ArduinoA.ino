#include <Wire.h>
#include <UnoWiFiDevEd.h>

#define SWITCH_1 2
#define SWITCH_2 4
#define SWITCH_3 7
#define SWITCH_4 8
#define LED_1 10
#define LED_2 11
#define LED_3 12
#define LED_4 13

#define CONNECTOR "rest"
#define SERVER_ADDR "158.108.165.223"
#define BEEZER 3

String tmpWrite = "";
String tmpRead = "";
String ringStatus;

CiaoData data;

void setup() {
  Ciao.begin();
  Serial.begin(9600);
  pinMode(LED_1, OUTPUT);
  pinMode(LED_2, OUTPUT);
  pinMode(LED_3, OUTPUT);
  pinMode(LED_4, OUTPUT);
  pinMode(SWITCH_1, INPUT);
  pinMode(SWITCH_2, INPUT);
  pinMode(SWITCH_3, INPUT);
  pinMode(SWITCH_4, INPUT);
  pinMode(BEEZER, OUTPUT);
  pinMode(A0, INPUT);
  pinMode(A1, INPUT);
}

void loop() {

  tmpRead = "/data/kaoyum/ring/";
  ringStatus = read();
  delay(500);
  if (ringStatus == "1") {
    analogWrite(BEEZER, 5);
    delay(2000);
    analogWrite(BEEZER, 0);
    tmpWrite = "/data/kaoyum/ring/set/0";
    write();
    //delay(500);
  }

  short LDR = analogRead(A1);
  Serial.println(LDR);
  if (LDR > 500) {
    digitalWrite(LED_1, HIGH);
    digitalWrite(LED_2, HIGH);
    digitalWrite(LED_3, HIGH);
    digitalWrite(LED_4, HIGH);
  }
  if (digitalRead(SWITCH_1) == LOW) {
    //if (LDR > 500)
    digitalWrite(LED_1, HIGH);
    tmpWrite = "/data/kaoyum/seat1/set/1" ;
    Serial.println(F("Seat 1 NOT"));
    write();
  }
  else {
    digitalWrite(LED_1, LOW);
    tmpWrite = "/data/kaoyum/seat1/set/0" ;
    Serial.println(F("Seat 1 Available"));
    write();
  }

  if (digitalRead(SWITCH_2) == LOW ) {
    //if (LDR > 500)
    digitalWrite(LED_2, HIGH);
    tmpWrite = "/data/kaoyum/seat2/set/1" ;
    Serial.println(F("Seat 2 NOT"));
    write();
  }
  else {
    digitalWrite(LED_2, LOW);
    tmpWrite = "/data/kaoyum/seat2/set/0" ;
    Serial.println(F("Seat 2 Available"));
    write();
  }

  if (digitalRead(SWITCH_3) == LOW ) {
    //  if (LDR > 500)
    digitalWrite(LED_3, HIGH);
    Serial.println(F("Seat 3 NOT"));
    tmpWrite = "/data/kaoyum/seat3/set/1" ;
    write();
  }
  else {
    digitalWrite(LED_3, LOW);
    tmpWrite = "/data/kaoyum/seat3/set/0" ;
    Serial.println(F("Seat 3 Available"));
    write();
  }

  if (digitalRead(SWITCH_4) == LOW) {
    //   if (LDR > 500)
    digitalWrite(LED_4, HIGH);
    tmpWrite = "/data/kaoyum/seat4/set/1" ;
    Serial.println(F("Seat 4 NOT"));
    write();
  }
  else {
    digitalWrite(LED_4, LOW);
    tmpWrite = "/data/kaoyum/seat4/set/0" ;
    Serial.println(F("Seat 4 Available"));
    write();
  }

  tmpWrite = "";
  tmpRead = "";
  delay(1000);
  Serial.println();
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
    Serial.println(String(data.get(2)));
    return String(data.get(2));
  }
}

