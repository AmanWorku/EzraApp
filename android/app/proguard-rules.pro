# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Keep your API models and their fields
-keepclassmembers class com.ezraapp.models.** { *; }
-keep class com.ezraapp.models.** { *; }

# Keep all annotations
-keepattributes *Annotation*

# Keep all public classes, interfaces, and enums
-keep public class * {
    public protected *;
}

# Additional rules for Redux Toolkit and other libraries
# Keep everything in the com.ezraapp.api package
-keep class com.ezraapp.api.** { *; }

# Keep Redux Toolkit generated code
-keepclassmembers class **.Api { *; }
-keepclassmembers class **.Api$* { *; }

# Keep Retrofit interfaces (if using Retrofit for API calls)
-keep interface com.ezraapp.api.** { *; }

# Keep Redux Toolkit Query generated code
-keep class * implements com.ezraapp.api.** { *; }

# Keep all classes in com.ezraapp package
-keep class com.ezraapp.** { *; }

# Keep Retrofit methods (if using Retrofit)
-keepclassmembers,allowobfuscation interface * {
    @retrofit2.http.* <methods>;
}
