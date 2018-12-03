package com.danaqueue;

import android.content.Intent;

import com.reactnativenavigation.NavigationActivity;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.view.Gravity;
import android.os.Bundle;


public class MainActivity extends NavigationActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override

    protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(this.createSplashLayout());
    }

     public LinearLayout createSplashLayout() {
         LinearLayout view = new LinearLayout(this);
         view.setGravity(Gravity.CENTER);
         String splashScreenBackgroundColor = "#6a69ef";
         view.setBackgroundColor(Color.parseColor(splashScreenBackgroundColor));
         return view;
     }
}
