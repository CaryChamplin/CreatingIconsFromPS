# Creating iOS and Mac OS icon assets from Adobe Photoshop

According to Apple's [iOS Human Interface Guidelines](https://developer.apple.com/ios/human-interface-guidelines/) and [Mac OS Human Interface Guidelines](https://developer.apple.com/macos/human-interface-guidelines/), the following sets of icons are needed for products supporting the current and recent versions of iOS and Mac OS, respectively:
![iOS and Mac OS app icon sizes](https://github.com/CaryChamplin/CreatingIconsFromPS/blob/master/icon-sizes-table.png)

[Adobe Photoshop](http://www.adobe.com/products/photoshop.html) (PS) can be used for creating the icon designs for both iOS and Mac OS. [PS scripts](http://www.adobe.com/devnet/photoshop/scripting.html) permits the use of a single artboard on PS (or in this case, a single PNG file with a size of at least 1024x1024 pixels) to build the entire set of iPhone, iPad, Mac OS, and Apple Watch icons automagically.

### PS Scripts for Creating iOS and Mac OS App Icons

PS supports use of external script files (e.g., JavaScript) that can be executed on a particular PS document from within PS or an image file. Here are the details:

- Since app icons are generated by PS from an external PNG image file, I have merged all the icons into one script.
- Scripts for PS can be written in various scripting languages, but this script is written in JavaScript.
- In my case with [PS](http://www.adobe.com/products/photoshop.html), I placed the JavaScript file in the default script folder: '/Applications/Adobe Photoshop CC 2018/Presets/Scripts/'. Actually, any folder location will do. However, if the JavaScript file is placed in the default script folder, then PS includes it in the script list automagically. As shown below, the 'File' drop-down menu script selection in PS shows the icon export JavaScript file. The JavaScript file is short, simple, and easy to understand.

![Pull-down menu for AI scripts](https://github.com/CaryChamplin/CreatingIconsFromPS/blob/master/ps_file-scripts.png)

### Selection of a PS Resampling Method

A resampling method is applied in the JavaScript file to generate the smaller icons from the original PNG image file. The icon image quality is directly related to the resampling method. For PS, the list of resampling methods are: AUTOMATIC, BICUBIC, BICUBICAUTOMATIC, BICUBICSHARPER, BICUBICSMOOTHER, BILINEAR, NEARESTNEIGHBOR, and PRESERVEDETAILS. I selected a mid-sized icon (76x76 pixels) from one of my projects under development as an example of the icon image differences due to resampling methods. Most of the time, I use either BICUBICSMOOTHER or BILINEAR for resampling. For this specific icon example, I prefer the BICUBICSMOOTHER resample method.

![Comparison of resample methods for an icon example](https://github.com/CaryChamplin/CreatingIconsFromPS/blob/master/icon76_ps_resampling-methods.png)

A final note: While this approach works, icons for professional-grade commercial apps should be reviewed and tweaked at each resolution for optimal pixel-level design, preferably by an expert graphic designer. It is a detail consistent with excellence.




