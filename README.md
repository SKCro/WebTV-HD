# WebTV HD
![WebTV HD logo](https://skcro.github.io/WebTV-HD/Logo.svg)

Previously known as "WebTV-CSS-Remake".

A project that aims to recreate WebTV's UI, page design, and some functionality, using modern web technologies (mainly HTML and CSS).

## How do I use this?
**Important:** If you're planning to use this in a project or website, please credit me when possible.
 
Click the "Code" button at the top and click "Download ZIP". Unzip wherever you want and open the PowerOn.html page.
 
![Screenshot of the "Code" button being pressed.](https://i.imgur.com/bXnlbAJ.png)

If you prefer (or are stuck with) with a command line interface, you can run ``git clone https://github.com/SKCro/WebTV-HD.git``, and copy all the resources over by entering the WebTV-HD directory, and running ``cp -r ./* <your location>``.

If you want to make your own website out of it, check out [the Wiki page](https://github.com/SKCro/WebTV-HD/wiki/Making-your-own-webpage) on that. (Currently incomplete)

## What does it look like?
![Screenshot of the style in action.](https://i.imgur.com/sU3F1Yd.png)

If you'd like to check it out for yourself, head on over to the [GitHub Pages instance](https://SKCro.github.io/WebTV-HD/PowerOn.html).

The home page's top bar icons were made by [BLUEamnesiac](https://www.deviantart.com/blueamnesiac/).

If anything is broken for you, please file a bug report and tell me the issue, which browser you used, and your screen resolution. Also provide a screenshot if possible.

## What are your goals for this project?
- Get the style to look as accurate as possible.
- Remake some of the Page Builder styles and separate the service page style from the base WebTV stuff (like the statusbar and buttons).
- ~~Make the style work better on mobile devices (or create a new one specifically designed for them).~~ Finally done! The sidebar now slides in and out via a button.
- Get the selection box to move via the arrow keys (and maybe gamepad), just like real WebTV. This would make big-screen browsing easier.
- Possibly make an MSN TV 2 style (although I'd probably make a second repo for that).
- \[Unlikely\] Make this into a browser extension of some sort that adds a WebTV overlay and allows navigation with your keyboard or a gamepad.
- \[Very Unlikely\] Try to make this into a WTVP-to-HTML interface. Essentially, make it into a WebTV client. This would be very complicated (as I have no backend skills and would definitely need help from others), but it is something I'm looking forward to getting working eventually (even at a very basic level).

If you'd like to suggest something, [create a new issue](https://github.com/SKCro/WebTV-HD/issues/new) with the "enhancement" label and let me know what you'd like added.

## TODO:
- ~~Flesh out everything.~~ Pretty much done.
- ~~Make the status bar look better on non-widescreen display sizes.~~ Done.
- Recreate more service pages like ~~login,~~ ~~mail,~~ settings, favorites, etc.
- ~~Add functionality with JavaScript.~~ Done.
- Fix the dang selection box scrolling bug.
- ~~Make Dialing.html actually work better by making it show a splash at 100% progress, along with redirecting to Home.html.~~ Done by nitrate92.
- ~~Flesh out Home.html.~~ Done.

## What if I need help using this code?
If you need help for any reason, feel free to contact me on Discord. My username there is the same as here: `SKCro`

Alternatively, you can contact me on Twitter (`@SKCro_`), but I don't really check Twitter often anymore, so Discord is your best bet.

If you want to report a bug or suggest a feature, use the [bug report template](https://github.com/SKCro/WebTV-HD/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D+) or [feature suggestion template](https://github.com/SKCro/WebTV-HD/issues/new?assignees=SKCro&labels=enhancement&projects=&template=feature-request.md&title=%5BRequest%5D+) respectively.

## Why is Tizen-related stuff left over?
I originally built this project with the Samsung Smart TV in mind, using the Tizen IDE (I wanted to see how a WebTV-like application would look), but I decided to expand it to modern browsers in general. That's why you might see some Tizen IDE leftovers (like stuff in the .gitignore).
 
You can safely ignore these leftovers, as they don't really serve much purpose.
