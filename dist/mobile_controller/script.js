var firebaseConfig = {
    apiKey: "AIzaSyC9QeEJYhYOaBwQibABgHH_COqqYQmc5Io",
    authDomain: "quizbar-57d1b.firebaseapp.com",
    databaseURL: "https://quizbar-57d1b.firebaseio.com",
    projectId: "quizbar-57d1b",
    storageBucket: "quizbar-57d1b.appspot.com",
    messagingSenderId: "340698618557",
    appId: "1:340698618557:web:e5f5be32bf21df7eb235d4"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
database = firebase.database();

var ref = database.ref("questions");

ref.on('value', getData, errData);

var resetTimer = false;
var x;

function getData(data) {
	var qsObj = data.val();
	var qCounter = qsObj.questionCounter;
	var totalQuestions = Object.keys(qsObj).length - 1;
	var questionsRemaining = totalQuestions - qCounter;

	var p = document.getElementById("curr-qs");
	var olParent = document.getElementById("question-list");
	while (olParent.firstChild) {
		olParent.removeChild(olParent.firstChild);
	}

	if (questionsRemaining > 0) {
		clearInterval(x);
		timer(30);
		p.innerHTML = eval("qsObj.q" + qCounter.toString());

		for (var i = qCounter + 1; i < totalQuestions; i++) {
			var li = document.createElement('li');
			var text = document.createTextNode(eval("qsObj.q" + i.toString()))
			li.appendChild(text);
			olParent.appendChild(li);
		}

	} else {
		p.innerHTML = "No question in Queue";
		clearInterval(x);
		var timerP = document.getElementById("timer");
		timerP.innerHTML = "Timer Stopped";
	}
}

function errData(err) {
  console.log("Error");
  console.log(err);
}

function nextQuestion() {
	var updates = {
		"maneesh": 0,
		"shruti": 0,
		"bubbles": 0,
		"anupum": 0,
		"sharon": 0,
		"neville": 0,
		"ajay": 0,
		"shilpa": 0,
		"puja": 0,
		"mayank": 0,
		"vaishali": 0,
		"mayur": 0,
		"prasanth": 0,
		"ritu": 0
	}
	ref = database.ref('counters');
	ref.update(updates);

	// Add check if counter is beyond limit

	ref = database.ref('questions');
	ref.child("questionCounter").set(firebase.database.ServerValue.increment(1));
}

function restart() {
	var updates = {
		"questionCounter": 0
	}
	ref.update(updates);
}

function timer(t) {
	var c = t + 1;
	var timerP = document.getElementById("timer");
	x = setInterval(function () {
		c = c - 1
		timerP.innerHTML = c.toString();
		if (c == 0) {
			clearInterval(x);
			timerP.innerHTML = "TIME UP";
		}
	}, 1000)
}