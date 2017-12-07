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
import java.util.ArrayList;
import java.util.List;


public class FallDetection extends AppCompatActivity {

    MediaPlayer mp;
    Button stop_button;
    private TextView location_textview;
    private TextView name_text;
    private TextView number_text;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_falldetection);

        stop_button=(Button)findViewById(R.id.stop_button);

        mp = MediaPlayer.create(this, R.raw.alarm_sound);
        location_textview = (TextView) findViewById(R.id.location);
        name_text = (TextView) findViewById(R.id.name_text);
        //number_text = (TextView) findViewById(R.id.number_text);
        mp.start();

        String phoneNumber= getIntent().getStringExtra("contactNumber");
      //  number_text.setText(phoneNumber );
        String name = getIntent().getStringExtra("contactName");
        name_text.setText(name + "\n" + phoneNumber );
        String address=getIntent().getStringExtra("address");
        location_textview.setText(address);

        ArrayList<String> message=new ArrayList<String>();
        message.add("Hi "+name+" your patient may have fallen.\nHis/her address is: ");
        message.add(address);
        message.add(" \nPlease check on him/her");

        SmsManager smsManager = SmsManager.getDefault();
        smsManager.sendMultipartTextMessage(phoneNumber,null,message,null,null);
        Toast.makeText(getApplicationContext(), "SMS Sent!",Toast.LENGTH_LONG).show();

        stop_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mp.stop();
            }
        });

    }
}
