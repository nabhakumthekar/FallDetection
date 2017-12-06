package com.example.nabha.falldetection;

import android.location.Geocoder;
import android.os.IBinder;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.media.MediaPlayer;
import android.telephony.SmsManager;
import android.widget.Toast;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import com.google.android.gms.location.FusedLocationProviderClient;
import android.location.Address;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;


public class FallDetection extends AppCompatActivity implements LocationListener {

    MediaPlayer mp;
    Button stop_button;
    private FusedLocationProviderClient mFusedLocationClient;
    protected Location mLastLocation;
    private static final String TAG = FallDetection.class.getSimpleName();
    Geocoder geocoder;
    List<Address> addresses;
    private TextView location_textview;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_falldetection);

        stop_button=(Button)findViewById(R.id.stop_button);

        mp = MediaPlayer.create(this, R.raw.alarm_sound);
        location_textview = (TextView) findViewById(R.id.location);
        mp.start();

        String phoneNumber= getIntent().getStringExtra("contactNumber");
        String name = getIntent().getStringExtra("contactName");
        String latitude=getIntent().getStringExtra("latitude");
        String longitude=getIntent().getStringExtra("longitude");
        String address=getIntent().getStringExtra("address");
        ArrayList<String> message=new ArrayList<String>();
        message.add("Hi "+name+"your patient may have fallen.\nHis address is: ");
        message.add(address);
        message.add(" \nPlease check on him/her");
        location_textview.setText(address);
        //String textBody = "Hi " + name + " your patient may have fallen. \nHis address is: "+address+" \nPlease check on him/her";
        String textBody = "Hi " + name + " your patient may have fallen. Lat: "+latitude+" Long:"+longitude+" \nPlease check on him/her";
        SmsManager smsManager = SmsManager.getDefault();
        //smsManager.sendTextMessage(phoneNumber, null, textBody, null, null);
        smsManager.sendMultipartTextMessage(phoneNumber,null,message,null,null);
        Toast.makeText(getApplicationContext(), "SMS Sent!",Toast.LENGTH_LONG).show();

        stop_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mp.stop();
            }
        });

    }

    @Override
    public void onProviderDisabled(String provider) {
    }

    @Override
    public void onProviderEnabled(String provider) {
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
    }

    @Override
    public void onLocationChanged(Location location) {

    }

    public IBinder onBind(Intent arg0) {
        return null;
    }
}
