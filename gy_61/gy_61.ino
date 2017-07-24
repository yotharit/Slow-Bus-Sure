const int xPin = A0;
const int yPin = A1;
const int zPin = A2;
unsigned long mPrevTime, mCurTime;
void setup()
{
  Serial.begin(9600)  ;
  mPrevTime = micros();
}

inline float calG(int readValue, int rawMin, int rawMax) {
  float avg = (rawMax + rawMin) / 2;
  return (readValue - avg) / (rawMax - avg) * 9.8;
}
float vx = 0;
float vy = 0;
float vz = 0;
void loop() {

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
  if(gy>-0.5&&gy<0.5)
  {
    gy = 0;
  }
  vy += gy * (mCurTime - mPrevTime) / 1e6;
  float gx = calG(xRead, 283, 426);
  if(gx>-0.5&&gx<0.5)
  {
    gx = 0;
  }
  vx += gx * (mCurTime - mPrevTime) / 1e6;
  float vtotal = sqrt((vx*vx)+(vy*vy));
  Serial.println(vtotal);
  delay(1000);
  mPrevTime = mCurTime;
}
