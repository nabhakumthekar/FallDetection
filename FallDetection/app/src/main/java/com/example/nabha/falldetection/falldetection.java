package com.example.nabha.falldetection;

import android.*;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.media.MediaPlayer;
import android.telephony.SmsManager;
import android.widget.Toast;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import java.io.IOException;
import java.util.List;
import java.util.Locale;

public class falldetection extends AppCompatActivity {

    MediaPlayer mp;
    Button stop_button;
    Button send_location_button;
    TextView location_textview;
    List<Address> addresses;
    Geocoder geocoder;

    public LocationListener locationListener;
    public LocationManager locationManager;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_falldetection);

        String phoneNumber= getIntent().getStringExtra("contactNumber");
        String name = getIntent().getStringExtra("contactName");
        mp = MediaPlayer.create(this, R.raw.alarm_sound);
        mp.start();

        String textBody = "Hi" + name + "your patient may have fallen. Please check on him/her";
        SmsManager smsManager = SmsManager.getDefault();
        smsManager.sendTextMessage(phoneNumber, null, textBody, null, null);
        Toast.makeText(getApplicationContext(), "SMS Sent!",
                Toast.LENGTH_LONG).show();

        location_textview=(TextView)findViewById(R.id.location);
        geocoder=new Geocoder(this, Locale.getDefault());
        locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
        locationListener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                location_textview.setText("\nLatitude:" + location.getLatitude() /*+ "\nLongitutude:" + location.getLongitude()*/);

                    try {
                        addresses=geocoder.getFromLocation(location.getLatitude(),location.getLongitude(),1);
                        String address=addresses.get(0).getAddressLine(0);
                        String area=addresses.get(0).getLocality();
                        String city=addresses.get(0).getAdminArea();
                        String country=addresses.get(0).getCountryName();
                        String postalCode=addresses.get(0).getPostalCode();
                        String fullAddress=address+","+area+","+city+","+postalCode+","+country;
                        location_textview.append(fullAddress);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
            }

            @Override
            public void onStatusChanged(String s, int i, Bundle bundle) {

            }

            @Override
            public void onProviderEnabled(String s) {

            }

            @Override
            public void onProviderDisabled(String s) {
                Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                startActivities(new Intent[]{intent});
            }
        };
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                requestPermissions(new String[]{
                        android.Manifest.permission.ACCESS_FINE_LOCATION, android.Manifest.permission.ACCESS_COARSE_LOCATION,
                        android.Manifest.permission.INTERNET
                }, 10);
            }
        }

        stop_button=(Button)findViewById(R.id.stop_button);
        stop_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               mp.stop();
            }
        });

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode) {
            case 10:
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED)
                    configureButton();
        }
    }
    private void configureButton() {
                locationManager.requestLocationUpdates("gps", 200, 0, locationListener);
    }
}
