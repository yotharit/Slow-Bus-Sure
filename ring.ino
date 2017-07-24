#include <Wire.h>
#include <UnoWiFiDevEd.h>
#define ring 9
#define CONNECTOR "rest"
#define SERVER_ADDR "158.108.165.223"
String tmpRead, tmpWrite, ringStatus;
CiaoData data;

void setup() {
  Ciao.begin();
  Serial.begin(9600);
  pinMode(ring, OUTPUT);
}

void write(){
  data = Ciao.read(CONNECTOR, SERVER_ADDR, tmpWrite);
  Serial.print(F("Sended: "));
  Serial.println(tmpWrite);
}

String read(){
  data = Ciao.read(CONNECTOR, SERVER_ADDR, tmpRead);
  return String(data.get(2));
}

void loop() {
  tmpRead = "/data/kaoYum/ring/";
  ringStatus = read();
  delay(500);
  if(ringStatus == "1"){
    analogWrite(ring,20);
    delay(2000);
    analogWrite(ring,0);
    tmpWrite = "/data/kaoYum/ring/set/off";
    write();
    delay(500);
  }
}
