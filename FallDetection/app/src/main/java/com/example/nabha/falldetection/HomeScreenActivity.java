package com.example.nabha.falldetection;

import android.*;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.hardware.SensorEventListener;
import android.hardware.SensorEvent;
import android.view.View.OnClickListener;
import android.widget.Toast;


public class HomeScreenActivity extends AppCompatActivity implements SensorEventListener {

    private static final int CONTACT_RESULT = 1;
    TextView contact_number;
    TextView name;
    Button select;
    Button save;
    String phone_number;
    private static final String TAG = HomeScreenActivity.class.getSimpleName();
    private String contact;
    private Sensor accelerometer;
    private SensorManager accelerometerManager;
    Context context;
    GPSTracker gps;
    long time1 = 0;
    long time2 = 0;
    boolean lessThan = false;
    boolean greaterThan = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_screen);

        contact_number = (TextView) findViewById(R.id.enter_contact_text);
        select = findViewById(R.id.select_btn);
        save = findViewById(R.id.save_button);
        name = (TextView) findViewById(R.id.name_text);
        context = getApplicationContext();
        accelerometerManager = (SensorManager)getSystemService(SENSOR_SERVICE);
        accelerometer = accelerometerManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        accelerometerManager.registerListener(this,accelerometer,SensorManager.SENSOR_DELAY_NORMAL);


        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
                    ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                requestPermissions(new String[]{
                        android.Manifest.permission.ACCESS_FINE_LOCATION, android.Manifest.permission.ACCESS_COARSE_LOCATION,
                        android.Manifest.permission.INTERNET
                }, 10);
            }
        }


        select.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                ActivityCompat.requestPermissions(HomeScreenActivity.this,
                        new String[]{android.Manifest.permission.READ_CONTACTS},
                        1);
                Intent intent= new Intent(Intent.ACTION_PICK,  ContactsContract.Contacts.CONTENT_URI);
                startActivityForResult(intent, CONTACT_RESULT);

            }
        });

        save.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                try{
                    ActivityCompat.requestPermissions(HomeScreenActivity.this,
                            new String[]{android.Manifest.permission.SEND_SMS},
                            2);
                    if(!contact_number.getText().toString().isEmpty()){
                        phone_number = contact_number.getText().toString();
                        Toast saveToast =  Toast.makeText(context, "Saved", Toast.LENGTH_SHORT);
                        saveToast.show();
                    }else {
                        Toast errorToast =  Toast.makeText(context, "Please enter phone number", Toast.LENGTH_SHORT);
                        errorToast.setGravity(Gravity.CENTER, 0, 0);
                        errorToast.show();
                    }
                    if(name.getText().toString().isEmpty()){
                        Toast errorToast =  Toast.makeText(context, "Please enter name", Toast.LENGTH_SHORT);
                        errorToast.setGravity(Gravity.CENTER, 0, 0);
                        errorToast.show();
                    }
                }catch (Exception e){
                    Log.d(TAG, "error " + e);
                }

            }
        });
    }

    @Override
    public void onSensorChanged(SensorEvent event) {

        double xVal = event.values[0];
        double yVal = event.values[1];
        double zVal = event.values[2];

        double acVector = Math.sqrt(xVal*xVal + yVal*yVal + zVal*zVal );

        if(acVector > 10){
            greaterThan = true;
            time1 = System.currentTimeMillis();
        }else if(acVector < 3){
            lessThan = true;
            time2 = System.currentTimeMillis();
        }

        if(greaterThan && lessThan) {
            if(time2 - time1 <= 2000 && time2 - time1 > 0 ){
                double  latitude;
                double  longitude;
                String  address;
                String strLat;
                String strLong;
                gps = new GPSTracker(HomeScreenActivity.this);
                Intent intent = new Intent();
                if(gps.canGetLocation()){
                    address=gps.getAddress();
                    intent.putExtra("address", address);
                }
                intent.putExtra("contactNumber", contact_number.getText().toString());
                intent.putExtra("contactName", name.getText().toString());
                intent.setClass(this,FallDetection.class);
                startActivity(intent);
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
                Uri uriContact;
                uriContact = data.getData();
                String contactNumber = null;
                String contactName = null;
                Cursor cursor = getContentResolver().query(uriContact, null,
                        null, null, null);

                if (cursor.moveToFirst()) {
                    contact = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
                    contactName = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
                }
                cursor.close();
                Cursor phoneNumber = getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                        new String[]{ContactsContract.CommonDataKinds.Phone.NUMBER},
                        ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = ? AND " +
                                ContactsContract.CommonDataKinds.Phone.TYPE + " = " +
                                ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE,
                        new String[]{contact},
                        null);

                if (phoneNumber.moveToFirst()) {
                    contactNumber = phoneNumber.getString(phoneNumber.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
                }
                phoneNumber.close();
                contact_number.setText(contactNumber);
                name.setText(contactName);
            }
        }catch (Exception e){
            Log.d(TAG, "error " + e);
        }

    }
}