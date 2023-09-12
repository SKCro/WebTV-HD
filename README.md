# WebTV HD
 Previously known as "WebTV-CSS-Remake".
 
 A project that aims to recreate WebTV Networks' UI and page design using modern web technologies, mainly CSS and HTML.
 Rather barebones and incomplete as of now, with only the main style done as of now.

## How do I use this?
 **Important:** If you're planning to use this in a project, please credit me when possible.
 
 Click the "Code" button at the top and click "Download ZIP". Unzip wherever you want and open the PowerOn.html page.
 
![Screenshot of the "Code" button being pressed.](https://i.imgur.com/ObYTKH3.png)

 Or, if you're stuck with a command line interface (specifically Linux), you can run ``git clone https://github.com/SKCro/WebTV-HD.git``, and copy all the resources over by entering the WebTV-HD directory, and running ``cp -r ./* <your location>``.

## What does it look like? 

  ![How the theme looks on the included style guide.](https://i.imgur.com/hGVmsdd.png)

If you'd like to check it out for yourself, head on over to the [GitHub Pages instance](https://SKCro.github.io/WebTV-HD/PowerOn.html).

If anything is broken for you, please file a bug report and tell me the issue, which browser you used, and your screen resolution. Also provide a screenshot if possible.

## TODO:
- Flesh out everything
- ~~Make the status bar look better on non-widescreen display sizes~~ Done
- Recreate more service pages like dialing, login, home page, mail, etc.
- ~~Add functionality with JavaScript~~ Done
- Make an actual backend. This might never be done, but you'll never know :P

## Why are Tizen-related files in the repo?
 I originally built this project with the Samsung Smart TV in mind, using the Tizen IDE (I wanted to see how a WebTV-like application would look), but I decided to expand it to modern browsers in general. That's why you might see some Tizen IDE leftovers (like stuff in the .gitignore and that one JS file).
 
 You can safely ignore these files, as they don't really serve much purpose.
