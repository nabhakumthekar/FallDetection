package com.example.nabha.falldetection;

import android.*;
import android.Manifest;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.media.MediaPlayer;
import android.telephony.SmsManager;
import android.widget.Toast;

public class falldetection extends AppCompatActivity {

    MediaPlayer mp;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_falldetection);
//        mp = MediaPlayer.create(this, R.raw.alarm_sound);
//        mp.start();

        String phoneNumber= getIntent().getStringExtra("contactNumber");
        String name = getIntent().getStringExtra("contactName");

        String textBody = "Hi" + name + "your patient may have fallen. Please check on him/her";
        SmsManager smsManager = SmsManager.getDefault();
        smsManager.sendTextMessage(phoneNumber, null, textBody, null, null);
        Toast.makeText(getApplicationContext(), "SMS Sent!",
                Toast.LENGTH_LONG).show();
    }
}
