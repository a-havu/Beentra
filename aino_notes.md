*Some web design notes*

The essential steps in web design:
1. Planning and strategy (why, what, who, how?)
2. Structure (UX) (Wireframes)
3. Design (UI) - colours & fonts

When I watched some "UI/UX design for beginners" videos, they always said that you should keep your target audience and goals in mind.

In this project, the target audience is Hive students (coding students) and the goal is to have all of them (or as many of them as possible) use the website and enjoy using it.

Having done analysis of my fellow students - ie. walking around the clusters and looking at everyone's screens - I've noticed that the vast majority of Hive students use dark colour schemes on their code editors, so i thought to try out the colours of default VS Code Dark theme in the design of this website.

*later...*
After discussing with product owner Laurens, we came up with a very different colour scheme. But it looks nice.

**March 9: PROBLEM with image upload**
The simplest way to upload & store images with our stack would be to use a third-party service Uploadthing, which requires a sign-up.
That's a problem when looking into the future - i don't want my personal email address to be tied to this project, if Hive decides to keep using it.

*options:*
1. create a project email account and access Uploadthing (or some other third-party service) from there
2. communicate with Hive staff about storing images locally on their servers/through their API
3. store imgs directly to DB as bytes - this could bloat the DB and be bad for performance

on March 10 it was decided to create a gmail account for Beentra and use a third-party service ImageKit

*learning about accessibility in web design*
- don't indicate something with colour only!
- i tried to get the design colours to be as distinct as possible - checked with different colourblindness checkers as well
- feedback should be easily readable/identifiable

TODO:
- fix project form Description field and extract the buttons in the modal

STYLING
- dropdown menu
- remember mobile!!
- BUTTON COLOURS need to be fixed

NOTICING:
- even though the Audio hackathon is going on, it's not visible in today's events
- the dropdown menu stays on even after navigating to the appointed page
- does anyone else have the weird icon bobbing around on profile form?
- the error messages in forms should be instant
