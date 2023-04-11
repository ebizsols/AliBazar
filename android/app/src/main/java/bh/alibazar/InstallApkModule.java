package com.alibazar.bh;

import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.widget.Toast;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class InstallApkModule extends ReactContextBaseJavaModule {
  private ReactApplicationContext _context = null;

  public InstallApkModule(ReactApplicationContext reactContext) {
    super(reactContext);
    _context = reactContext;
  }

  @Override
  public String getName() {
    return "InstallApk";
  }

  @ReactMethod
  public void Update(String apkurl) {
    try {
      System.out.println("Function start");
      URL url = new URL(apkurl);
      HttpURLConnection c = (HttpURLConnection) url.openConnection();
      c.setRequestMethod("GET");
      c.setDoOutput(true);
      c.connect();
      System.out.println("Greetings from Java");
      String PATH = Environment.getExternalStorageDirectory() + "/download/";
      File file = new File(PATH);
      file.mkdirs();
      File outputFile = new File(file, "app.apk");
      FileOutputStream fos = new FileOutputStream(outputFile);

      InputStream is = c.getInputStream();

      byte[] buffer = new byte[1024];
      int len1 = 0;
      while ((len1 = is.read(buffer)) != -1) {
        fos.write(buffer, 0, len1);
      }
      fos.close();
      is.close(); //till here, it works fine - .apk is download to my sdcard in download file
      //            Intent promptInstall = new Intent(Intent.ACTION_VIEW)
      //                    .setData(Uri.parse(PATH+"app.apk"))
      //                    .setType("application/android.com.app");
      //            startActivity(promptInstall);//installation is not working

    } catch (IOException e) {
      Toast
        .makeText(
          getReactApplicationContext(),
          "Update error!" + e.getMessage(),
          Toast.LENGTH_LONG
        )
        .show();
    }
  }

  @ReactMethod
  public void install(String path) {
    try {
      String cmd = "chmod 777 " + path;
      try {
        Runtime.getRuntime().exec(cmd);
      } catch (Exception e) {
        e.printStackTrace();
      }
      System.out.println("Greetings from Java and path is: " + path);
      Intent intent = new Intent(Intent.ACTION_VIEW);
      intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      intent.setDataAndType(
        Uri.parse("content://" + path),
        "application/vnd.android.package-archive"
      );
      _context.startActivity(intent);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      Toast
        .makeText(
          getReactApplicationContext(),
          "error while installing apk: ! " + e.getMessage(),
          Toast.LENGTH_LONG
        )
        .show();
    }
  }
}
