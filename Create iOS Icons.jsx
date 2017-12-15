//=============================================================================
// Photoshop script to create iPhone, iPad, Apple Watch and Mac icons from a
// square image (size >= 1024 x 1024 pixels).
//
// Copyright (c) 2010 Matt Di Pasquale
// Added tweaks Copyright (c) 2012 by Josh Jones ( https://gist.github.com/twonjosh )
// Added tweaks Copyright (c) 2017 by Cary Champlin ( https://github.com/CaryChamplin )
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// The software is provided "as is", without warranty of any kind, express or
// implied, including but not limited to the warranties of merchantability,
// fitness for a particular purpose and noninfringement. In no event shall the
// authors or copyright holders be liable for any claim, damages or other
// liability, whether in an action of contract, tort or otherwise, arising from,
// out of or in connection with the software or the use or other dealings in
// the software.
//-----------------------------------------------------------------------------
// Steps:
// 1) Create or acquire a PNG file as the input image file.
//    - image must be square
//    - image size must be at least 1024x1024 px
//
// 2) Save the file 'Create iOS Icons.jsx' file to the following folder:
//    - default location for scripts within Photoshop
//    - following folder path assumes MacOS and Adobe Photoshop 2018
//    	/Applications/Adobe Photoshop CC 2018/Presets/Scripts/
//
// 3) Restart Photoshop
//
// 4) With Photoshop open, select File > Scripts > Create iOS Icons:
//    - When prompted, select the PNG image file from Step 1.
//    - When prompted, select the destination folder for saving the icons.
//-----------------------------------------------------------------------------
// References:
//  Adobe Photoshop JavaScript Reference
//    http://www.adobe.com/devnet/photoshop/scripting.html
//  Apple iOS Human Interface Guidelines
//    https://developer.apple.com/ios/human-interface-guidelines/
//  Apple Mac OS Human Interface Guidelines
//    https://developer.apple.com/macos/human-interface-guidelines/
//=============================================================================

try
{
  // Prompt user to select input image file. Clicking "Cancel" returns null.
  var artworkImage = File.openDialog("Select a PNG image file that is square and at least 1024x1024 px.", "*.png", false);

  if (artworkImage !== null)
  {
    var doc = open(artworkImage, OpenDocumentType.PNG);

    if (doc == null)
    {
      throw "Something is wrong with the file.  Make sure it's a valid PNG file.";
    }

    var startState = doc.activeHistoryState;       // save for undo
    var initialPrefs = app.preferences.rulerUnits; // will restore at end
    app.preferences.rulerUnits = Units.PIXELS;     // use pixels

    if (doc.width != doc.height)
    {
        throw "Image is not square";
    }
    else if (doc.width < 1024)
    {
        throw "Image is too small!  Image must be at least 1024x1024 pixels.";
    }

    // Prompt user to select output folder for icons. Clicking "Cancel" returns null.
    var destFolder = Folder.selectDialog( "Choose an output folder to save icons.");

    if (destFolder == null)
    {
      // User canceled, just exit
      throw "";
    }

    // Save icons as PNG-24 using PS 'Save for Web'.
    var sfw = new ExportOptionsSaveForWeb();
    sfw.format = SaveDocumentType.PNG;
    sfw.PNG8 = false; // use PNG-24
    sfw.transparency = true;
    doc.info = null;  // delete metadata

   	// icons table includes current sets for iPhone, iPad, Apple Watch, and Mac
    var icons = [
     {"name": "AppStoreiOS_1024",     "size":1024},
     {"name": "AppStoreMac_1024",     "size":1024},
     {"name": "AppStoreWatch_1024",   "size":1024},

     {"name": "iPad_20",              "size":20},
     {"name": "iPad_20@2x",           "size":20*2},
     {"name": "iPad_29",              "size":29},
     {"name": "iPad_29@2x",           "size":29*2},
     {"name": "iPad_40",              "size":40},
     {"name": "iPad_40@2x",           "size":40*2},
     {"name": "iPad_76",              "size":76},
     {"name": "iPad_76@2x",           "size":76*2},
     {"name": "iPad_83.5@2x",         "size":83.5*2},

     {"name": "iPhone_20@2x",         "size":20*2},
     {"name": "iPhone_20@3x",         "size":20*3},
     {"name": "iPhone_29@2x",         "size":29*2},
     {"name": "iPhone_29@3x",         "size":29*3},
     {"name": "iPhone_40@2x",         "size":40*2},
     {"name": "iPhone_40@3x",         "size":40*3},
     {"name": "iPhone_60@2x",         "size":60*2},
     {"name": "iPhone_60@3x",         "size":60*3},

     {"name": "mac_16",                "size":16},
     {"name": "mac_16@2x",             "size":16*2},
     {"name": "mac_32",                "size":32},
     {"name": "mac_32@2x",             "size":32*2},
     {"name": "mac_128",               "size":128},
     {"name": "mac_128@2x",            "size":128*2},
     {"name": "mac_256",               "size":256},
     {"name": "mac_256@2x",            "size":256*2},
     {"name": "mac_512",               "size":512},
     {"name": "mac_512@2x",            "size":512*2},

     {"name": "watch_24@2x",          "size":24*2},
     {"name": "watch_27.5@2x",        "size":27.5*2},
     {"name": "watch_29@2x",          "size":29*2},
     {"name": "watch_29@3x",          "size":29*3},
     {"name": "watch_40",             "size":40},
     {"name": "watch_44@2x",          "size":44*2},
     {"name": "watch_86@2x",          "size":86*2},
     {"name": "watch_98@2x",          "size":98*2}
    ];

    var icon;
    for (i = 0; i < icons.length; i++)
    {
      icon = icons[i];
      doc.resizeImage(icon.size, icon.size, // width, height
                      null, ResampleMethod.BICUBICSHARPER);

      var destFileName = icon.name + ".png";

      doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
      doc.activeHistoryState = startState; // undo resize
    }

    alert("Icons have been created and saved.");
  }
}
catch (exception)
{
  // Show debug message and then quit
	if ((exception != null) && (exception != ""))
    alert(exception);
 }
finally
{
    if (doc != null)
        doc.close(SaveOptions.DONOTSAVECHANGES);

    app.preferences.rulerUnits = initialPrefs; // restore preferences
}
