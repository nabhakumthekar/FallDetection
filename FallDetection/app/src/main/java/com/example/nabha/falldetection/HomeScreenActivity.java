package com.example.nabha.falldetection;

import android.app.DialogFragment;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.hardware.SensorEventListener;
import android.hardware.SensorEvent;

import org.w3c.dom.Text;

import java.text.DecimalFormat;

import static android.app.PendingIntent.getActivity;

public class HomeScreenActivity extends AppCompatActivity  implements SensorEventListener {

    private static final int CONTACT_RESULT = 100;
    TextView contact_number;
    MediaPlayer mp;
    double sigma=0.5,th=10,th1=5,th2=2;
    public double xVal,yVal,zVal;
    static int BUFF_SIZE=50;
    static public double[] window = new double[BUFF_SIZE];
    Button lets_go_button=(Button)findViewById(R.id.lets_go_button);
    TextView testing=(TextView)findViewById(R.id.testing_textview);
    AlertDialog.Builder builder;

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
        mp = MediaPlayer.create(this, R.raw.alarm_trigger);
        contact_number = (TextView) findViewById(R.id.select_contact_text);
        accelerometerManager = (SensorManager)getSystemService(SENSOR_SERVICE);
        accelerometer = accelerometerManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        accelerometerManager.registerListener(this,accelerometer,SensorManager.SENSOR_DELAY_NORMAL);
        start();
    }

    private void start() {

        for(int i=0;i<BUFF_SIZE;i++){
            window[i]=0;
        }
        lets_go_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //getValue();

            }
        });
    }

    @Override
    public void onSensorChanged(SensorEvent event) {

        xVal = event.values[0];
        yVal = event.values[1];
        zVal = event.values[2];

        double acVector = Math.sqrt(xVal*xVal + yVal*yVal + zVal*zVal );
/*
        if(acVector > 30){
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
        }*/
        DecimalFormat precision = new DecimalFormat("0.00");
        double ldAccRound = Double.parseDouble(precision.format(acVector));
        if (ldAccRound > 0.3d && ldAccRound < 0.5d) {
            testing.setText("Fall Detected");
            mp.start();
           Userok obj=new Userok();
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        //nothing to do
    }

    public void selectContact(View view) {
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
