# WebTV HD
![WebTV HD logo](https://skcro.github.io/WebTV-HD/Logo.svg)

<sub>Previously known as "WebTV-CSS-Remake".</sub>

A project that aims to recreate WebTV's UI, page design, and some functionality, using modern web technologies, mainly HTML5, CSS3, and some wacky JS :P

For those who are unfamilliar, WebTV was an internet access device released in 1996 by a company called WebTV Networks. It was later bought by Microsoft and rebranded to MSN TV. If you want more info on it, check out the [Wikipedia article](https://en.wikipedia.org/wiki/MSN_TV).

## How do I try it out?
### Head on over to the **[GitHub Pages instance](https://SKCro.github.io/WebTV-HD/)** if you'd like to try it out.

Alternatively, if you'd like to try the latest, bleeding-edge changes to the code, check out the "[Daily service](https://SKCro.destroytheos.net/)" (a self-hosted version) instead. **Note that it might not be online all the time as it is running off my computer, which isn't always powered on or connected to the network. As usual with beta stuff, expect lots of bugs, incomplete features, and downtime.**

Firefox is recommended - the progress bar animation and some JS timing stuff is a bit broken on Chrome due to differences in their browser engines. <sub>**You shouldn't be using Chrome if you support open-source software anyway!**</sub>

If anything is broken for you (and you're using a reasonably modern browser), **please [file a bug report](https://github.com/SKCro/WebTV-HD/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D+)** and tell me the issue, which browser you used, and your screen resolution. Provide a screenshot if possible.

Alternatively, DM me on Discord - username is `SKCro`.

## How do I use the code?
**Important:** If you're planning to use this for a project or website, please credit me when possible. This could be a small credit at the bottom of your website or having my name (along with a link to the repo) on a credits page.
 
Click the "Code" button at the top and click "Download ZIP".

Unzip wherever you want and **use a server to host the code** - it doesn't work correctly if you just open the `index.html` file in your web browser due to cross-origin problems. See [this article](https://github.com/SKCro/WebTV-HD/wiki/Why-can't-I-run-WebTV-HD-by-opening-index.html%3F) for details.
 
![Screenshot of the "Code" button being pressed, revealing the "Download ZIP" button.](https://i.imgur.com/bXnlbAJ.png)

If you prefer (or are stuck with) with a command line interface, you can run `git clone https://github.com/SKCro/WebTV-HD.git`, and copy all the resources over by entering the WebTV-HD directory, and running `cp -r ./* <your location>`.

The wiki has some useful info, so make sure to [check it out](https://github.com/SKCro/WebTV-HD/wiki/).

## What are your goals for this project?
I don't have an exact roadmap - I just sorta add what I feel like adding. In no particular order, here are a few goals for the project:
- Get the style to look as accurate as possible. 100% accuracy is infeasible, but I will do what I can.
- Remake some of the Page Builder styles ~~and separate the service page style from the base WebTV stuff (like the statusbar and buttons)~~. Partially done - service-page-exclusive styles are now in the `service.css` file. Page Builder pages seem to work fine on modern browsers, so there's really no need to remake their styles.
- ~~Make the style work better on mobile devices (or create a new one specifically designed for them).~~ Finally done! The sidebar now slides in and out via a button.
- Get the selection box to move via the arrow keys (and maybe gamepad), just like real WebTV. This would make big-screen browsing easier. Partially done with tab navigation.
- Possibly make an MSN TV 2 style (although I'd probably make a second repo for that).
- ~~\[Unlikely\] Make this into a browser extension of some sort that adds a WebTV overlay and allows navigation with your keyboard or a gamepad.~~ Unfortunately, this is currently impossible due to the way WebTV HD works - it embeds the page into an iframe so that WebTV elements like the status bar draw on top of the page (and aren't a part of it). The problem is that a lot of big websites don't allow embedding for security reasons - you can try this yourself: open the Go To panel and try to go to a popular site like YouTube. It will probably give you either nothing at all or an error message.
- \[Very Unlikely\] Try to make this into a WTVP-to-HTML interface. Essentially, make it into a WebTV client. This would be very complicated (I have no backend skills and would definitely need help from others), but it is something I'm looking forward to getting working eventually, even at a very basic level.

If you'd like to suggest something, fill out the [feature suggestion template](https://github.com/SKCro/WebTV-HD/issues/new?assignees=SKCro&labels=enhancement&projects=&template=feature-request.md&title=%5BRequest%5D+) to let me know what you'd like to see added to WebTV HD.

## What if I need help using this code?
If you need help for any reason, feel free to contact me on Discord. Username is the same as here: `SKCro`

Alternatively, you can contact me on Twitter (`@SKCro_`), but I don't really check Twitter often anymore, so Discord is your best bet.

If you want to report a bug or suggest a feature, use the [bug report template](https://github.com/SKCro/WebTV-HD/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D+) or [feature suggestion template](https://github.com/SKCro/WebTV-HD/issues/new?assignees=SKCro&labels=enhancement&projects=&template=feature-request.md&title=%5BRequest%5D+) respectively.

## TODO:
- ~~Flesh out everything.~~ Pretty much done.
- ~~Make the status bar look better on displays that aren't quite widescreen.~~ Done.
- ~~Recreate more service pages like login, mail, settings, favorites, etc.~~ Mostly done.
- ~~Add functionality with JavaScript.~~ Done.
- ~~Fix the dang selection box scrolling bug.~~ Finally done!
- ~~Make Dialing.html actually work better by making it show a splash at 100% progress, along with redirecting to Home.html.~~ Done by nitrate92.
- ~~Flesh out Home.html.~~ Done.

Welp, everything in the TODO is pretty much crossed out now. Does this mean that I'm done with the project? Not by a long shot! There will definitely be more to come in the future.