# Pre-work - _Hearing the Rainbow_

**Hearing the Rainbow** is a Color & Sound Memory game (with a slight twist) to apply for CodePath's SITE Program.

Submitted by: **Claudia Eder**

Time spent: **10** hours spent in total

Link to project: https://glitch.com/edit/#!/jealous-quilted-beryllium

## Required Functionality

The following **required** functionality is complete:

- [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [x] "Start" button toggles between "Start" and "Stop" when clicked.
- [x] Game buttons each light up and play a sound when clicked.
- [x] Computer plays back sequence of clues including sound and visual cue for each button
- [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [x] User wins the game after guessing a complete pattern
- [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [x] Buttons use a pitch (frequency) other than the ones in the tutorial
- [x] More than 4 functional game buttons
- [x] Playback speeds up on each turn
- [x] Computer picks a different pattern each time the game is played
- [x] Player only loses after 3 mistakes (instead of on the first mistake)
- [x] Game button appearance change goes beyond color (e.g. add an image)
- [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Radio switch to change between sound and color game mode
- [x] Displays the number of strikes and time remaining
- [x] Each time the game is played in color game mode the buttons are randomly assigned a color audio to play (like the Stroop Effect), which changes each time start is pushed
- [x] Color audio is played black faster each time to fit within the short clue hold time

## Video Walkthrough

Here's a walkthrough of implemented user stories:
There is no sound on gifs so cannot demonstrate the tones and audio functionality
![](https://i.imgur.com/hGaapml.gif)
Losing with strikes
![](https://i.imgur.com/b23MGHk.gif)
Losing with timeout
![](https://i.imgur.com/dz5O8fn.gif)
Switching game modes
![](https://i.imgur.com/YlWm3se.gif)
Winnong and showing randomized patterns

## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.\
   Voice Generator for the color audio- https://voicegenerator.io/
   To create radio buttons- https://www.w3schools.com/tags/att_input_type_radio.asp
   To determine which radio button is selected- https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
   Learn about playback rate- https://www.w3schools.com/jsref/prop_audio_playbackrate.asp
   Shuffling elements in an array- https://www.codegrepper.com/code-examples/javascript/shuffle+map+javascript
   To learn about set interval- https://www.w3schools.com/jsref/met_win_setinterval.asp
   How add pictures to buttons- http://www.java2s.com/Code/HTMLCSS/Form/Buttonbackgroundimageurlimagesbuttongif.htm

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)\
   While creating this submission, I came across a few challenges while implementing the optional features. My biggest challenge arose while creating the ticking clock because 
   I did not fully understand the logic behind the setInterval and clearInterval methods, so even though I was placing them in correct location in my code it was not executing 
   as I expected. Each time I would start the game, my clock would tick down faster and faster rather than in the 1 second intervals. Upon researching this issue further, I realized 
   that it was because setInterval returns a timer object that must be cleared by clearInterval in order to stop. Since I was creating a new instance of the timer while executing, 
   it was not being properly cleared. To fix this, I created an interval as a global variable so it could be reused each time the interval starts and cleared rather than getting 
   overwhelmed keeping track of past intervals. Once I fixed the increasing speed of the timer, my timer was still starting before the clues finished being given. I thought that 
   since my code was after the looping through the clues in the playClueSequence function, it should start after all the clues played. The issue was that even though it looped through 
   all the clues, the clues were set to play on a delay with the setTimeout function rather than immediately, thus I had the start the countdown with the same delay, using the setTimeout 
   function.  
   Another challenge came up when I began to randomize the color audio that played for each button. I realized that if the players had not yet played the game, each button was not 
   assigned an audio since start called the randomization function. To overcome this issue and to reduce confusion in between games, I set it so if the game were not being played 
   (gamePlaying==false) then the buttons would play the audio corresponding to their actual color rather than the randomized selection. Another issue was that since the clue hold time was
   getting shorter as the game went on, the color audio began to get cut off in the middle. To prevent, this I increased the play back to speed up with the clue hold time so the audio could
   fit better in the shorter time frame.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)\
   After complementing my submission, I am more intrigued by web development than I was before this experience and have so much more respect for every aspect the goes into any website. 
   My biggest interest lies in how to go about makes the features of your website more customizable and aesthetically pleasing. Every website seems to have its own theme: personalized colors, 
   interactive features, and branding. I want to learn how to make a website that is polished and professional and build on the basic features we learned through this project. I also am 
   curious how to allow users to navigate from page to page of a website. In android development, I learned about using intents to send users from one activity to another. I assume that 
   something similar is used and would love to explore it more by creating a multipage website. 
  On a grander scale, I also would love to learn about how a project goes from code and displayed on just your local host to an actual viewable webpage on the internet. How are website maintained 
  and updates once users have access to them? Once a website is live, what can the web developer do to get feedback from the users that all the features are functioning as they should be? I would 
  love to explore also how the data and feedback from users is stored and once again accessed by the developers.


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)\
   If I had more time to work on this project, I would further attempt to fix the glitch that occurs with the tones. For some reason, when I open my game in another webpage, the tones do not play when in sound game mode. It is extremely strange since it executes properly when the game in run in the window next to the code, so I am unsure if is an issue with my code or possibly with my web browser. I spent a few hours looking on the internet about issues with Audio Contexts not playing but could not come across anything similar to my issue in Glitch. I also would have liked to explore making my project more aesthetic and professional. Even though I added all the extended features and changed the appearance a little, it still appears very elementary. I would like to have solidified the layout so that way the features did not move so dynamically. I felt like every time I added a feature it was not clear where it would end up due to the current layout model.

## License

    Copyright [Claudia Eder]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
