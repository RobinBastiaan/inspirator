# inspirator

Are you clueless for what kind of scouting activity you want to organise this time around? Do you want to see which
activities have not yet been done for a while, so you know when they can be repeated? Search specifically for what you
want to find! Be inspired by the Inspirator!

## About

This small web page plugin provides a convenient filter for a suitable scouting activity. Using the responsive form at
the top of the page allows the user to display only those activities that fit the parameters. The total number of
results is directly shown with a subtle but neat animation. Clicking on a result will redirect the user to the
associated page with complete instructions how to execute the activity.

## Installation & Inner workings

This project is build to be used on the PBworks platform. This platform does come with its quirks and limitations that
had to be built around with.

- For the CSS and the JS to work, it has to be added as a plugin-widget on a PBworks page. You need to have admin
  privileges to be able to do that.
- Since the platform does not allow large file-size within a plugins-widget, the script of the Inspirator has to be
  placed in multiple smaller plugins-widgets. This makes large classes and functions not possible.
- When editing a PBworks page, all plugins-widgets are not executed. This allows the source table to be only hidden when
  not editing for a clean and easy way for users to edit it by using CSS within a plugin-widget.
- To make this project work on both the platform and the localhost, I added <div id="wikipage-inner"> to the file. Since
  this div is already present on a PBworks page, it is not needed to copy this element over. Only the source table needs
  to be added to the page as plain HTML.
- Changing the colors of this project in order to be used in other (PBworks) color themes should be fairly easy via the
  use of CSS custom properties.

## Preview

![Inspirator Preview](https://user-images.githubusercontent.com/38226878/114247614-d05f1080-9995-11eb-8cbe-bb53b2c3005d.PNG)

<p align="center" width="100%">
    <img width="10%" src="favicon.png?raw=true"> 
</p>