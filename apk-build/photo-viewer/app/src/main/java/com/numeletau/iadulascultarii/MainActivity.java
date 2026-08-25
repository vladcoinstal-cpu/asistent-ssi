package com.numeletau.iadulascultarii;

import android.app.Activity;
import android.content.ClipData;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.ImageDecoder;
import android.graphics.drawable.AnimatedImageDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.OpenableColumns;
import android.database.Cursor;
import android.view.Gravity;
import android.view.ViewGroup;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.HorizontalScrollView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends Activity {
    private static final int PICK_IMAGES = 1001;
    private final List<Uri> images = new ArrayList<>();
    private int currentIndex = -1;
    private int scaleIndex = 0;
    private ImageView imageView;
    private TextView statusView;
    private Button scaleButton;

    private final ImageView.ScaleType[] scaleTypes = new ImageView.ScaleType[]{
            ImageView.ScaleType.FIT_CENTER,
            ImageView.ScaleType.CENTER_CROP,
            ImageView.ScaleType.FIT_XY,
            ImageView.ScaleType.CENTER_INSIDE
    };
    private final String[] scaleNames = new String[]{"Fit", "Crop", "Stretch", "Center"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        buildUi();
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    private Button makeButton(String text) {
        Button button = new Button(this);
        button.setText(text);
        button.setAllCaps(false);
        button.setMinHeight(dp(44));
        button.setPadding(dp(12), 0, dp(12), 0);
        return button;
    }

    private void buildUi() {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(12), dp(12), dp(12), dp(12));
        root.setBackgroundColor(0xFFF4F6F8);

        TextView title = new TextView(this);
        title.setText("Galerie Foto Animată");
        title.setTextSize(22f);
        title.setTextColor(0xFF18202A);
        title.setGravity(Gravity.CENTER_HORIZONTAL);
        title.setPadding(0, dp(6), 0, dp(8));
        root.addView(title, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        statusView = new TextView(this);
        statusView.setText("Alege una sau mai multe imagini");
        statusView.setTextSize(14f);
        statusView.setTextColor(0xFF4C5968);
        statusView.setGravity(Gravity.CENTER_HORIZONTAL);
        statusView.setPadding(dp(4), dp(4), dp(4), dp(10));
        root.addView(statusView, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        FrameLayout imageFrame = new FrameLayout(this);
        imageFrame.setBackgroundColor(0xFF111418);
        imageView = new ImageView(this);
        imageView.setScaleType(scaleTypes[scaleIndex]);
        imageFrame.addView(imageView, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        LinearLayout.LayoutParams frameParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f);
        frameParams.bottomMargin = dp(10);
        root.addView(imageFrame, frameParams);

        HorizontalScrollView controlsScroll = new HorizontalScrollView(this);
        controlsScroll.setHorizontalScrollBarEnabled(false);
        LinearLayout controls = new LinearLayout(this);
        controls.setOrientation(LinearLayout.HORIZONTAL);
        controls.setGravity(Gravity.CENTER_VERTICAL);

        Button pickButton = makeButton("Alege poze");
        pickButton.setOnClickListener(v -> pickImages());
        controls.addView(pickButton);

        Button previousButton = makeButton("◀");
        previousButton.setOnClickListener(v -> move(-1));
        controls.addView(previousButton);

        Button nextButton = makeButton("▶");
        nextButton.setOnClickListener(v -> move(1));
        controls.addView(nextButton);

        scaleButton = makeButton("Format: " + scaleNames[scaleIndex]);
        scaleButton.setOnClickListener(v -> cycleScale());
        controls.addView(scaleButton);

        Button fadeButton = makeButton("Fade");
        fadeButton.setOnClickListener(v -> animateFade());
        controls.addView(fadeButton);

        Button zoomButton = makeButton("Zoom");
        zoomButton.setOnClickListener(v -> animateZoom());
        controls.addView(zoomButton);

        Button rotateButton = makeButton("Rotire");
        rotateButton.setOnClickListener(v -> animateRotate());
        controls.addView(rotateButton);

        Button slideButton = makeButton("Slide");
        slideButton.setOnClickListener(v -> animateSlide());
        controls.addView(slideButton);

        Button resetButton = makeButton("Reset");
        resetButton.setOnClickListener(v -> resetTransform());
        controls.addView(resetButton);

        controlsScroll.addView(controls, new HorizontalScrollView.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        root.addView(controlsScroll, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        TextView help = new TextView(this);
        help.setText("Formate uzuale: JPG/JPEG, PNG, WebP, GIF, BMP, HEIC/HEIF și AVIF (dacă sunt suportate de versiunea Android). Nu este necesar acces complet la stocare.");
        help.setTextSize(12f);
        help.setTextColor(0xFF667384);
        help.setPadding(dp(4), dp(8), dp(4), dp(2));
        root.addView(help, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        setContentView(root);
    }

    private void pickImages() {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("image/*");
        intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
        intent.putExtra(Intent.EXTRA_MIME_TYPES, new String[]{
                "image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp",
                "image/heic", "image/heif", "image/avif"
        });
        startActivityForResult(intent, PICK_IMAGES);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != PICK_IMAGES || resultCode != RESULT_OK || data == null) return;

        List<Uri> selected = new ArrayList<>();
        ClipData clip = data.getClipData();
        if (clip != null) {
            for (int i = 0; i < clip.getItemCount(); i++) selected.add(clip.getItemAt(i).getUri());
        } else if (data.getData() != null) {
            selected.add(data.getData());
        }

        if (selected.isEmpty()) return;
        images.clear();
        for (Uri uri : selected) {
            try {
                getContentResolver().takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
            } catch (Exception ignored) { }
            images.add(uri);
        }
        currentIndex = 0;
        showCurrentImage();
    }

    private void move(int delta) {
        if (images.isEmpty()) {
            toast("Alege mai întâi o imagine.");
            return;
        }
        currentIndex = (currentIndex + delta + images.size()) % images.size();
        showCurrentImage();
    }

    private void showCurrentImage() {
        if (currentIndex < 0 || currentIndex >= images.size()) return;
        Uri uri = images.get(currentIndex);
        resetTransform();
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                ImageDecoder.Source source = ImageDecoder.createSource(getContentResolver(), uri);
                Drawable drawable = ImageDecoder.decodeDrawable(source);
                imageView.setImageDrawable(drawable);
                if (drawable instanceof AnimatedImageDrawable) ((AnimatedImageDrawable) drawable).start();
            } else {
                try (InputStream input = getContentResolver().openInputStream(uri)) {
                    Bitmap bitmap = BitmapFactory.decodeStream(input);
                    if (bitmap == null) throw new IllegalArgumentException("Formatul nu poate fi decodat pe acest dispozitiv.");
                    imageView.setImageBitmap(bitmap);
                }
            }
            statusView.setText((currentIndex + 1) + " / " + images.size() + "  •  " + getDisplayName(uri));
        } catch (Exception e) {
            imageView.setImageDrawable(null);
            statusView.setText("Nu pot deschide: " + getDisplayName(uri));
            toast("Format nesuportat sau fișier deteriorat: " + e.getMessage());
        }
    }

    private String getDisplayName(Uri uri) {
        try (Cursor cursor = getContentResolver().query(uri, new String[]{OpenableColumns.DISPLAY_NAME}, null, null, null)) {
            if (cursor != null && cursor.moveToFirst()) {
                int idx = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME);
                if (idx >= 0) return cursor.getString(idx);
            }
        } catch (Exception ignored) { }
        String last = uri.getLastPathSegment();
        return last == null ? "imagine" : last;
    }

    private void cycleScale() {
        scaleIndex = (scaleIndex + 1) % scaleTypes.length;
        imageView.setScaleType(scaleTypes[scaleIndex]);
        scaleButton.setText("Format: " + scaleNames[scaleIndex]);
    }

    private void animateFade() {
        if (!hasImage()) return;
        imageView.animate().cancel();
        imageView.setAlpha(0.15f);
        imageView.animate().alpha(1f).setDuration(900).setInterpolator(new AccelerateDecelerateInterpolator()).start();
    }

    private void animateZoom() {
        if (!hasImage()) return;
        imageView.animate().cancel();
        imageView.setScaleX(0.65f);
        imageView.setScaleY(0.65f);
        imageView.animate().scaleX(1f).scaleY(1f).setDuration(800).setInterpolator(new AccelerateDecelerateInterpolator()).start();
    }

    private void animateRotate() {
        if (!hasImage()) return;
        imageView.animate().cancel();
        imageView.setRotation(0f);
        imageView.animate().rotation(360f).setDuration(900).setInterpolator(new AccelerateDecelerateInterpolator()).start();
    }

    private void animateSlide() {
        if (!hasImage()) return;
        imageView.animate().cancel();
        imageView.setTranslationX(dp(120));
        imageView.setAlpha(0.35f);
        imageView.animate().translationX(0f).alpha(1f).setDuration(700).setInterpolator(new AccelerateDecelerateInterpolator()).start();
    }

    private boolean hasImage() {
        if (images.isEmpty() || imageView.getDrawable() == null) {
            toast("Alege mai întâi o imagine.");
            return false;
        }
        return true;
    }

    private void resetTransform() {
        imageView.animate().cancel();
        imageView.setAlpha(1f);
        imageView.setScaleX(1f);
        imageView.setScaleY(1f);
        imageView.setRotation(0f);
        imageView.setTranslationX(0f);
        imageView.setTranslationY(0f);
    }

    private void toast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }
}
