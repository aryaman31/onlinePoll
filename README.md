# onlinePoll
A simple poll application I made using html and vanilla js. My parents needed a specific type of poll for their weekly games night, and I decided to make this instead of searching online.

The way this works is each person opens "" on their mobile phones or laptops. I used firebase hosting to put it on the web so people can access it from their browsers.

Whenever someone votes for some option on their device, the bar graph updates on everyones screens. I managed to do this use firebases's realtime database. Since this was a small project and was only to be used by a small group of people, I didn't add any login system to protect the database. 

The mobile_controller is the main control for the whole system. You can skip questions, restart the quiz and view all questions here. 
