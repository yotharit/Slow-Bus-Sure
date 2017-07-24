#include <Wire.h>
#include <UnoWiFiDevEd.h>

#define SWITCH_1 2
#define SWITCH_2 3
#define SWITCH_3 4
#define SWITCH_4 9
#define LED_1 5
#define LED_2 6
#define LED_3 7
#define LED_4 8
#define SWITCH1_PRESSED LOW
#define SWITCH2_PRESSED LOW
#define SWITCH3_PRESSED LOW
#define SWITCH4_PRESSED LOW

#define CONNECTOR "rest"
#define SERVER_ADDR "158.108.165.223"
#define ring 10

//boolean isSwitch_1_On;
//boolean isSwitch_2_On;
//boolean isSwitch_3_On;
//boolean isSwitch_4_On;

//int seat[] = {0, 0, 0, 0};

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
  pinMode(ring, OUTPUT);
  pinMode(A0, INPUT);

}

void loop() {

  short LDR = analogRead(A0);
  Serial.println(LDR);

  //  int light = analogRead(A0);
  //  Serial.println(ligt);
  if ((digitalRead(SWITCH_1) == LOW)) {
    if (LDR > 500)digitalWrite(LED_1, HIGH);
    digitalWrite(LED_1, HIGH);
    //   isSwitch_1_On = true;
    tmpWrite = "/data/kaoyum/seat1/set/1" ;
    Serial.println(F("Seat 1 Available"));
    write();
    //  seat[0] = 1;
  }
  else {
    //   isSwitch_1_On = false;
    tmpWrite = "/data/kaoyum/seat1/set/0" ;
    Serial.println(F("Seat 1 NOT"));
    write();
    //   seat[0] = 0;
  }

  if ((digitalRead(SWITCH_2) == LOW) ) {
    if (LDR > 500)digitalWrite(LED_2, HIGH);
    digitalWrite(LED_2, HIGH);
    //   isSwitch_2_On = true;
    tmpWrite = "/data/kaoyum/seat2/set/1" ;
    Serial.println(F("Seat 2 NOT"));
    write();
    //  seat[1] = 1;
  }
  else {
    //  isSwitch_2_On = false;
    tmpWrite = "/data/kaoyum/seat2/set/0" ;
    Serial.println(F("Seat 2 Available"));
    write();
    //  seat[1] = 0;
  }

  if ((digitalRead(SWITCH_3) == LOW) ) {
    if (LDR > 500)digitalWrite(LED_3, HIGH);
    digitalWrite(LED_3, HIGH);
    //  isSwitch_3_On = true;
    Serial.println(F("Seat 3 NOT"));
    tmpWrite = "/data/kaoyum/seat3/set/1" ;
    write();
    //  seat[2] = 1;
  }
  else {
    //  isSwitch_3_On = false;
    tmpWrite = "/data/kaoyum/seat3/set/0" ;
    Serial.println(F("Seat 3 Available"));
    write();
    // seat[2] = 0;
  }

  if ((digitalRead(SWITCH_4) == LOW) ) {
    if (LDR > 500)digitalWrite(LED_4, HIGH);

    // isSwitch_4_On = true;
    tmpWrite = "/data/kaoyum/seat4/set/1" ;
    Serial.println(F("Seat 4 NOT"));
    write();
    // seat[3] = 1;
  }
  else {
    //isSwitch_4_On = false;
    tmpWrite = "/data/kaoyum/seat4/set/0" ;
    Serial.println(F("Seat 4 Available"));
    write();
    //seat[3] = 0;
  }

  tmpRead = "/data/kaoyum/ring/";
  ringStatus = read();
  delay(500);
  Serial.println("EGEGEGEGGE");
  if (ringStatus == "1") {
    analogWrite(ring, 5);
    delay(2000);
    analogWrite(ring, 0);
    tmpWrite = "/data/kaoyum/ring/set/0";
    write();
    delay(500);
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
  //str = " / data / 5910500147 / light / set / qwertyu" ;
  //Serial.println(str);
  if (data.isEmpty()) {
    Serial.println(F("False"));
  }
  else {
    Serial.println(String(data.get(2)));
    return String(data.get(2));
  }
}

