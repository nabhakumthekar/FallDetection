package com.example.nabha.falldetection;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.Button;
import android.widget.TextView;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.hardware.SensorEventListener;
import android.hardware.SensorEvent;

public class HomeScreenActivity extends AppCompatActivity implements SensorEventListener {

    private static final int CONTACT_RESULT = 100;
    TextView contact_number;

    private Sensor accelerometer;
    private SensorManager accelerometerManager;
    long time1 = 0;
    long time2 = 0;
    boolean lessThan = false;
    boolean greaterThan = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_screen);
        contact_number = (TextView) findViewById(R.id.select_contact_text);
        accelerometerManager = (SensorManager)getSystemService(SENSOR_SERVICE);
        accelerometer = accelerometerManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        accelerometerManager.registerListener(this,accelerometer,SensorManager.SENSOR_DELAY_NORMAL);
    }

    @Override
    public void onSensorChanged(SensorEvent event) {

        double xVal = event.values[0];
        double yVal = event.values[1];
        double zVal = event.values[2];

        double acVector = Math.sqrt(xVal*xVal + yVal*yVal + zVal*zVal );

        if(acVector > 25){
            greaterThan = true;
            time1 = System.currentTimeMillis();
            Log.i("acVector",String.valueOf(acVector));
        }else if(acVector < 3){
            lessThan = true;
            Log.i("acVector",String.valueOf(acVector));
            time2 = System.currentTimeMillis();
        }


        if(greaterThan && lessThan) {
            if(time2 - time1 <= 10000 && time2 - time1 > 0 ){
                Log.i("fall detected","fall detected");
            }
            greaterThan = false;
            lessThan = false;
            time1 = 0;
            time2 = 0;
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        //nothing to do
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        try{
        if (requestCode == CONTACT_RESULT && resultCode == RESULT_OK) {
            Uri uri = data.getData();
            Cursor cursor = getContentResolver().query(uri, null, null, null, null);
            cursor.moveToFirst();
            int phoneNumberColumn = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER);
            contact_number.setText(cursor.getString(phoneNumberColumn));
        }
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
